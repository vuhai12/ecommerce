import db from '../models';
import { Op } from 'sequelize';
import { v4 as generateId } from 'uuid';
import { address } from '../helpers/joi_schemas';
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

//CRUD = CREATE - READ - UPDATE - DELETE

//READ


export const getProfileUserById = (profileUserID) => new Promise(async (resolve, reject) => {
  try {
    const response = await db.ProfileUser.findOne({
      where: { profileUserID },
      attributes: {
        exclude: ['createdAt', 'updatedAt',]
      },
    })
    resolve({
      error: response ? 0 : 1,
      message: response ? 'Got' : 'profileUserData not found',
      profileUserData: response
    })
  } catch (error) {
    reject(error)
  }
})

