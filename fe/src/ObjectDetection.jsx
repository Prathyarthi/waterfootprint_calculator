import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import axios from "axios";

function ObjectDetection() {
    const [result, setResult] = useState("");
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runCoco = async () => {

        const net = await cocossd.load();

        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 10);
    };

    let detectionInProgress = false;
    const detect = async (net) => {


        if (detectionInProgress) {
            return;
        }

        detectionInProgress = true;

        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            const obj = await net.detect(video);

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");

            // 5. TODO - Update drawing utility
            // drawSomething(obj, ctx)

            drawRect(obj, ctx);

            if (obj.length > 0) {
                const firstObj = obj[0];
                const response = await axios.post("http://localhost:8000/detect", {
                    obj: firstObj.class
                })

                setResult(response.data.waterfootprint);

                detectionInProgress = false
            }

        }
    };

    useEffect(() => {
        runCoco()
    }, []);
    return (
        <>
            <div className="h-screen from-slate-400 to-slate-600 bg-gradient-to-br">
                <div>
                    <h1 className="text-black font-bold text-4xl">WaterFootPrint: {result} Litres</h1>
                </div>
                <div className="h-screen flex justify-center items-center">
                    <div className="flex justify-center items-center">
                        <header className="">
                            <Webcam
                                ref={webcamRef}
                                muted={true}
                                style={{
                                    position: "absolute",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                    zindex: 9,
                                    width: 640,
                                    height: 480,
                                    borderRadius: "10px",
                                }}
                            />

                            <canvas
                                ref={canvasRef}
                                style={{
                                    position: "absolute",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                    zindex: 8,
                                    width: 640,
                                    height: 480,

                                }}
                            />
                        </header>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ObjectDetection