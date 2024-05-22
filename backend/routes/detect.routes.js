import { imageClassification } from "../controllers/Image.controller.js";
import { objectDetection } from "../controllers/detect.controller.js";

import { Router } from "express";
import { inputDetect } from "../controllers/inputDetect.controller.js";
const router = Router();

router.route("/detect").post(objectDetection);
router.route('/input-detect').post(inputDetect)
router.route("/image-classification").post(imageClassification);
export default router;