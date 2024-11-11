import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { bid, title, price, available, category_code, image, bids, filename, description } from "../helpers/joi_schemas";
import Joi from "joi";
const cloudinary = require('cloudinary').v2;



//Get one
export const getProfileUserById = async (req, res) => {
    try {
        const { id } = req.user
        const response = await services.getProfileUserById(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}


