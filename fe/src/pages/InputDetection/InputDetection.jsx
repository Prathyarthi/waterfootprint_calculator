import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import axiosInstance from "../../axiosInstance";
import axios from "axios";

function InputDetection() {
    const [result, setResult] = useState("");
    const [input, setInput] = useState("");

    const handleSubmit = async () => {
        const res = await axios.post("http://localhost:8000/inputDetect", { input })
        console.log(res.data);
        setResult(res.data.waterfootprint)
    };
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <div>
                <h1 className="text-4xl">WaterFootPrint: {result} Litres</h1>
            </div>
            <div className="m-3">
                <input type="text" placeholder="Enter name to search" onChange={(e) => setInput(e.target.value)} className="border border-slate-300 px-4 py-3 outline-none rounded-md" />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-2 px-10 rounded" onClick={handleSubmit}>Detect</button>
        </div>
    )
}

export default InputDetection