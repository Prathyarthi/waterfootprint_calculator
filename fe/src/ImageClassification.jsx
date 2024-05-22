import * as mobilenet from '@tensorflow-models/mobilenet';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function ImageClassification() {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [result, setResult] = useState("No data");

    const imageRef = useRef(null);

    const identifyImage = async () => {
        if (!model || !imageRef.current) return;

        try {
            const predictions = await model.classify(imageRef.current);
            setPredictions(predictions);
            sendPredictionsToBackend(predictions);
            console.log(predictions);
        } catch (error) {
            console.log(error);
        }
    };

    const sendPredictionsToBackend = async (predictions) => {
        try {
            if (predictions.length > 0) {
                const firstPrediction = predictions[0];
                const response = await axios.post('http://localhost:8000/detectImage', {
                    className: firstPrediction.className.trim().split(' ')[0]
                });
                setResult(response.data.waterfootprint);
                console.log('Backend response:', response.data);
                console.log('Response:', response.data.waterfootprint);
            }
        } catch (error) {
            console.error('Error sending prediction to backend:', error);
        }
    };

    const uploadImage = (e) => {
        const { files } = e.target;

        if (files && files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
        }
        else {
            setImageURL(null);
        }
    };

    const loadModel = async () => {
        setIsModelLoading(true);

        try {
            const model = await mobilenet.load();
            setModel(model);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error);
            setIsModelLoading(false);
        }
    };

    useEffect(() => {
        loadModel();
    }, []);

    if (isModelLoading) {
        return <h1 className='text-center flex justify-center items-center h-screen text-4xl'>Loading...</h1>;
    }

    return (
        <>
            <div className="h-screen flex flex-col gap-5 justify-center items-center">
                <div className='flex justify-center items-center text-4xl'>
                    <h1>Image Identification</h1>
                </div>
                <div className='flex justify-center'>
                    <input type="file" accept='image/*' capture='user' onChange={uploadImage} />
                </div>
                <div>
                    <div>
                        <div>
                            {imageURL && <img src={imageURL} alt="img" crossOrigin='anonymous' ref={imageRef} />}
                        </div>
                        {predictions.length > 0 && <div>
                            {predictions.map((prediction, index) => {
                                return (
                                    <div key={prediction.className}>
                                        <h1 className='text-2xl'>{prediction.className}</h1>
                                        <h3 className='text-2xl'> Confidence level: {(prediction.probability * 100).toFixed(2)}%</h3>
                                        {index === 0 &&
                                            <h3>Best Predicted result</h3>
                                        }
                                    </div>
                                );
                            })}
                        </div>}
                        {imageURL &&
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded text-3xl' onClick={identifyImage}><h2>Identify Image</h2></button>
                        }
                        <h1 className='text-3xl font-bold'>Waterfootprint: {result} Litres</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImageClassification;
