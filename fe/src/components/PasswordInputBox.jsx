import { useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";

export function PasswordInputBox({ label, placeholder, onChange, value, name }) {
    const [pass, setPass] = useState(true);
    const handlePass = () => {
        setPass(!pass);
    }
    return <div className="flex py-2 flex-col gap-1">
        <label className=" text-sm font-semibold text-black text-left" htmlFor="password">
            {label}
        </label>
        <div className="flex items-center">
            <input
                required
                type={pass ? "password" : "text"}
                name={name}
                placeholder={placeholder}
                className="bg-transparent rounded-md px-2 py-1 max-w-[100%] w-96 border border-slate-200 text-black"
                value={value}
                onChange={onChange}
            />
            <div className="-ml-7 cursor-pointer">
                {pass ? (
                    <ImEye onClick={handlePass} />
                ) : (
                    <ImEyeBlocked onClick={handlePass} />
                )}
            </div>
        </div>
    </div>
}