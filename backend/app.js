import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express()
import { config } from "dotenv";
import ollama from "ollama";

let modelResponse = ""

const chatConfig = ({
    model: "llama2",
    role: "user",
    content: ""
})

config()

app.use(cors({
    origin: process.env.FRONTEND_URI, // marked * to make access from all
    credentials: true
}))

// console.log("Forntend URI", process.env.FRONTEND_URI);
app.use(morgan("dev"))

app.get("/", (_req, res) => {
    res.json({
        message: "Hello"
    })
})

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ // To make understand express the encoded url
    limit: "16kb", extended: true
}))
app.use(express.static("public")) // To store any public assests in server (Temp
app.use(cookieParser());
// Routes
import userRouter from "./routes/user.routes.js";
import detectRouter from "./routes/detect.routes.js";
import Wf from "./models/wfSchema.js";
import Household from "./models/householdSchema.js";
// Declaring Routes
app.use("/api/v1/users", userRouter)

app.use("/api/v1", detectRouter)

app.post("/detect", async (req, res) => {
    const detectedObj = req.body;
    console.log(detectedObj.obj);
    const object = detectedObj.obj;

    try {
        const product_returned = await Wf.findOne({
            product: object
        })

        if (!product_returned) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        else {
            return res.json({
                waterfootprint: JSON.stringify(product_returned.waterfootprint)
            })
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const appliance_returned = await Household.findOne({
            appliance: object
        })

        if (!appliance_returned) {
            return res.status(404).json({
                message: "Appliance not found"
            });
        }
        else {
            return res.json({
                waterfootprint: JSON.stringify(product_returned.waterfootprint)
            })
        }
    } catch (error) {
        console.log(error);
    }
});


app.post('/ask', async (req, res) => {
    try {
        const question = req.body.question.trim()
        const response = await invoke(question)
        res.status(200).json({
            success: true,
            message: "Response fetched successfully",
            response
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch response"
        })
    }
})


async function invoke(question) {
    console.log(`-----`)
    console.log(`[${chatConfig.model}]: ${question}`)
    console.log(`-----`)
    try {
        console.log(`Running prompt...`)
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: question }],
        })
        console.log(`${response.message.content}\n`)
        modelResponse = response.message.content
        return modelResponse
    }
    catch (error) {
        console.log(`Query failed!`)
        console.log(error)
    }
}


export { app }