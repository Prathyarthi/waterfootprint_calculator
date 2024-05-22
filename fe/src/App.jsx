import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageClassification from "./ImageClassification";
import ObjectDetection from "./ObjectDetection";
import InputDetection from "./pages/InputDetection/InputDetection";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import InputBox_chatbot from "./components/InputBox_chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/imageClassification" element={<ImageClassification />} />
          <Route path="/objectDetection" element={<ObjectDetection />} />
          <Route path="/input-detect" element={<InputDetection />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/chatbot" element={<InputBox_chatbot />} />

        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App


