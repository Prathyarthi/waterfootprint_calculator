import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import zod from "zod";
import jwt from "jsonwebtoken";

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndrefreshToken = async (userId) => {
    try {
        // console.log(userId);
        const user = await User.findOne(userId)
        // console.log(user);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const signup = asyncHandler(async (req, res) => {
    const signupSchema = zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(1),
        confirmPassword: zod.string().min(1)
    })
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const validSchema = signupSchema.safeParse(req.body);

    if (!validSchema.success) {
        throw new ApiError(400, "All Fields are required", validSchema.error)
    }

    const existingUser = await User.findOne({ email })
    // console.log("user", existingUser);

    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }

    const profileLocalPath = req.files?.profile[0]?.path;
    console.log("LocalPath", profileLocalPath);
    if (!profileLocalPath) {
        throw new ApiError(400, "Profile file is required")
    }

    const profile = await uploadOnCloudinary(profileLocalPath)
    console.log("Profile :", profile);

    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match")
    }

    const newUser = await User.create({
        firstName,
        lastName,
        profile: profile.url,
        email,
        password
    })

    const createdUser = await User.findById(newUser._id)
    // console.log(createdUser);

    if (!createdUser) {
        throw new ApiError(400, "User Creation Failed")
    }

    const { accessToken, refreshToken } = await generateAccessAndrefreshToken(createdUser._id)

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, createdUser, "User Created Successfully")
        )
})

const signin = asyncHandler(async (req, res) => {
    const signinSchema = zod.object({
        email: zod.string().email(),
        password: zod.string()
    })

    const { email, password } = req.body
    const validSchema = signinSchema.safeParse(req.body);

    if (!validSchema.success) {
        throw new ApiError(400, "All Fields are required", validSchema.error)
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "User not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndrefreshToken(user._id)
    // console.log("AccessToken :", accessToken);

    const loggedInUser = await User.findById(user._id).select("-refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User Logged In Successfully")
        )
})

const getUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "User Fetched  Successfully")
        )
})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User LoggedOut Successfully"))
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password")
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Pasword Changed Successfully.!"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndrefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

export {
    signup,
    signin,
    getUser,
    logout,
    changePassword,
    refreshAccessToken
}