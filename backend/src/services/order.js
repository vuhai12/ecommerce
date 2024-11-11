import { response } from 'express';
import db from '../models';
import { Op, where } from 'sequelize';
import { v4 as generateId } from 'uuid';
import { isChecked, isDelivered, isPaid, status } from '../helpers/joi_schemas';
const cloudinary = require('cloudinary').v2;

export const createOrder = (body, id) =>

  new Promise(async (resolve, reject) => {
    try {
      const { count, rows } = await db.CartBook.findAndCountAll({
        where: {
          isChecked: true
        },
      })
      if (count > 0) {
        const response = await db.Order.create(
          {
            id: generateId(),
            totalPrices: 87999999,
            paymentMethod: body.methodPayment,
            status: 'Active',
            isDelivered: false,
            isPaid: false,
            orderUserId: id,
            // address:body.address
          })

        if (response && response.id) {
          const data = body.listBookInCartChecked.map((item) => {
            return {
              id: generateId(),
              orderBookId: response.id,
              bookOrderId: item.books.id
            }
          })
          const listBookInCartChecked = data.map((item) => {
            return item.bookOrderId
          })
          const res = await db.OrderBook.bulkCreate(data)
          if (res) {
            const response = await db.CartBook.destroy({
              where: {
                bookCartId: {
                  [Op.in]: listBookInCartChecked
                },
              },
            });
          }
        }
      }
      resolve({
        error: (response) ? 0 : 1, //true: 0 false: 1
        message: (response) ? 'Created' : 'Cannot create order',
      });
    } catch (error) {
      reject(error);
    }
  });


export const getOrders = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Order.findAll({
        raw: true,
        nest: true,
        include: [{
          model: db.Book,
          as: 'books',
          required: true,
          // attributes: ['id', 'name'],
          through: {
            model: db.OrderBook,
            as: 'orders',
            // attributes: ['qty'],
          }
        }]
      });

      resolve({
        error: response ? 0 : 1,
        message: response ? 'Got' : 'Cannot found',
        orderData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getOrderById = (orderUserId) => 
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Order.findAll({
        where: {
          orderUserId
        },
        raw: true,
        nest: true,
        include: [{
          model: db.Book,
          as: 'books',
          required: true,
          // attributes: ['id', 'name'],
          through: {
            model: db.OrderBook,
            as: 'orders',
            // attributes: ['qty'],
          }
        }]
      })

      resolve({
        error: response ? 0 : 1,
        message: response ? 'Got' : 'Cannot found',
        orderData: response,
      });
    } catch (error) {
      reject(error);
    }
  })
