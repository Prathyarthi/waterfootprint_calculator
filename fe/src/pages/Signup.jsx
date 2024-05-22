import { useState } from "react"
import { toast } from "react-hot-toast"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { PasswordInputBox } from "../components/PasswordInputBox"
import { useNavigate } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs"
import axiosInstance from "../axiosInstance"

export const Signup = () => {
  const navigate = useNavigate();
  const [previewImage, setImagePreview] = useState("");
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: ""
  });

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];
    // console.log(uploadedImage);
    // if image exists then getting the url link of it
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        profile: uploadedImage
      })
      // console.log(uploadedImage);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  return <div className="bg-slate-950 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-slate-100 w-full text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <label className="cursor-pointer overflow-hidden" htmlFor="image_uploads">
          {previewImage ? (
            <img
              className="w-28 h-28 object-cover rounded-full m-auto text-transparent"
              src={previewImage}
              alt="preview_image"
            />
          ) : (
            <BsPersonCircle className="w-28 h-28 object-cover rounded-full m-auto" />
          )}
        </label>
        <input
          onChange={getImage}
          className="hidden"
          type="file"
          id="image_uploads"
          name="image_uploads"
          accept=".jpg, .jpeg, .png"
        />
        <InputBox name="firstName" placeholder="John" label={"First Name"} onChange={handleUserInput} value={signupData.firstName} />
        <InputBox name="lastName" placeholder="vencob" label={"Last Name"} onChange={handleUserInput} value={signupData.lastName} />
        <InputBox name="email" placeholder="Test@gmail.com" label={"Email"} onChange={handleUserInput} value={signupData.email} />

        <div className="flex flex-col">
          <PasswordInputBox name="password" placeholder="........" label={"Password"} onChange={handleUserInput} value={signupData.password} />
        </div>
        <div className="flex flex-col">
          <PasswordInputBox name="confirmPassword" placeholder="........" label={"Confirm Password"} onChange={handleUserInput} value={signupData.confirmPassword} />
        </div>
        <div className="pt-4">
          <Button onClick={async () => {
            try {
              const formDataToSend = new FormData();
              formDataToSend.append('firstName', signupData.firstName);
              formDataToSend.append('lastName', signupData.lastName);
              formDataToSend.append('email', signupData.email);
              formDataToSend.append('password', signupData.password);
              formDataToSend.append('confirmPassword', signupData.confirmPassword);
              formDataToSend.append('profile', signupData.profile);

              let response = axiosInstance.post("/users/signup", formDataToSend, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });

              toast.promise(response, {
                loading: "Creating the user.....⏳",
                success: "User Signup successfully..!✅",
                error: "Error creating user...❌"
              });

              response = await response

              localStorage.setItem("accessToken", response.data.accessToken);
              navigate("/dashboard");
            } catch (error) {
              console.error("Signup Error:", error);
            }
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div >
}