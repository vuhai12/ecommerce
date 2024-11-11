import db from '../models';
import { Op } from 'sequelize';
import { v4 as generateId } from 'uuid';
const cloudinary = require('cloudinary').v2;

//CRUD = CREATE - READ - UPDATE - DELETE

//READ
export const getCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll();
      resolve({
        error: response ? 0 : 1,
        message: response ? 'Got' : 'Cannot found',
        categoryData: response,
      });
    } catch (error) {
      reject(error);
    }
  });











