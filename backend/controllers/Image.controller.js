import Wf from '../models/wfSchema.js'
import Household from '../models/householdSchema.js'
import { asyncHandler } from '../utils/asyncHandler.js';
const imageClassification = asyncHandler(async (req, res) => {

    const { className } = req.body;
    console.log(className);
    const object = className;

    try {
        const product_returned = await Wf.findOne({
            // product: object
            product: { $regex: object, $options: 'i' }
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
                waterfootprint: JSON.stringify(product_returned.waterfootprintPerDay)
            })
        }
    } catch (error) {
        console.log(error);
    }
});
export {
    imageClassification
}