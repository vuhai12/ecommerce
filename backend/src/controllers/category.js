import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { bid, title, price, available, category_code, image, bids, filename, description } from "../helpers/joi_schemas";
import Joi from "joi";
const cloudinary = require('cloudinary').v2;

//READ
export const getCategory = async (req, res) => {
    try {
        const response = await services.getCategory()
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}