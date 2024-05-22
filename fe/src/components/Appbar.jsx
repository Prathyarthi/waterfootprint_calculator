import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance.js";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
    const [firstName, setFirstName] = useState("");
    const [img, setImg] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []); // Refresh user data on route change

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get("/users/getUser");
            setFirstName(response.data.data.firstName);
            setImg(response.data.data.profile);
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
            console.error("Error fetching user data:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/users/logout");
            setIsLoggedIn(false); // Update isLoggedIn state
            navigate("/signin");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleSignin = async () => {
        await fetchUserData();
    };

    return (
        <div className="shadow h-14 flex bg-black justify-between">
            <div className="flex flex-col font-bold justify-center h-full ml-4 text-[#0095ff]">
                <Link to={"/"}>Vistaar</Link >
            </div>
            <div className="flex items-center justify-around">
                {isLoggedIn ? ( // Render username and profile image if logged in
                    <>
                        <div className="text-white">
                            <Link className="mr-3" to={"/how-to-save"}>How To Save</Link>
                            <Link className="mr-3" to={"/saving-guide"}>Categories</Link>
                        </div>
                        <div className="flex items-center text-white mr-3">
                            <span className="mr-2 uppercase underline">{firstName}</span>
                            <img src={img} alt="profile" className="h-12 w-12 object-cover mt-1 ml-2 rounded-full" />
                        </div>
                        <button onClick={handleLogout} className="border px-4 py-2 mr-3 bg-gray-300 hover:bg-gray-400 rounded-lg text-black">Logout</button>

                    </>
                ) : (
                    <div className="flex">
                        <Link to={"/signup"} className="border px-4 py-2 mr-3 hover:bg-gray-400 bg-gray-300 rounded-lg">Signup</Link>
                        <Link to={"/signin"} onClick={handleSignin} className="border px-4 py-2 mr-3 bg-gray-300 hover:bg-gray-400 rounded-lg">Signin</Link>
                    </div>
                )}
            </div>
        </div>
    );
};
