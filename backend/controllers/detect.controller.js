import Wf from '../models/wfSchema.js'
import Household from '../models/householdSchema.js'
import { asyncHandler } from '../utils/asyncHandler.js';

const objectDetection = asyncHandler(async (req, res) => {
    const detectedObj = req.body;
    console.log(detectedObj.obj);   
    const object = detectedObj.obj;

    console.log(object);

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
                waterfootprint: JSON.stringify(appliance_returned.waterfootprintPerDay)
            })
        }
    } catch (error) {
        console.log(error);
    }
});

export {
    objectDetection
}