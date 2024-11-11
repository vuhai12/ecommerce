import db from '../models';
import { Op, where } from 'sequelize';
import { v4 as generateId } from 'uuid';
import { cartBookId, isChecked, quantity, totalPrices } from '../helpers/joi_schemas';
const cloudinary = require('cloudinary').v2;


export const addCart = (body, id) =>
  new Promise(async (resolve, reject) => {
    try {

      const cart = await db.Cart.findOne({ where: { cartUserId: id } })
      if (!cart) {
        const cartBook = await db.Cart.create({
          id: generateId(),
          cartUserId: id,
        })
        const bookInCart = await db.CartBook.findOne({
          where: {
            bookCartId: body.bid
          }
        })
        if (bookInCart) {
          await db.Book.update({
            quantity: body.quantity
          }, {
            where: {
              id: body.bid
            }
          })
        } else {
          await db.CartBook.create({
            id: generateId(),
            cartBookId: cartBook.id,
            bookCartId: body.bid
          })
          await db.Book.update({
            quantity: body.quantity
          }, {
            where: {
              id: body.bid
            }
          })
        }
      } else {
        const bookInCart = await db.CartBook.findOne({
          where: {
            bookCartId: body.bid
          }
        })
        if (bookInCart) {
          await db.Book.update({
            quantity: body.quantity
          }, {
            where: {
              id: body.bid
            }
          })
        } else {
          await db.CartBook.create({
            id: generateId(),
            cartBookId: cart.id,
            bookCartId: body.bid
          })
          await db.Book.update({
            quantity: body.quantity
          }, {
            where: {
              id: body.bid
            }
          })
        }
      }
      resolve({
        // error: response.count ? 0 : 1, //true: 0 false: 1
        // message: response.count ? 'Success' : 'Cannot create or update Cart',
      });
    } catch (error) {
      reject(error);
    }
  });

export const getCartById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Cart.findAll({
        raw: true,
        nest: true,
        where: {
          cartUserId: id
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: db.Book,
          as: 'books',
          required: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: {
            model: db.CartBook,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            as: 'cartBooks',
            required: true,
          }
        }]
      });
      resolve({
        error: response ? 0 : 1, //true: 0 false: 1
        message: response ? 'Success' : 'Cannot create or update Cart',
        cartData: response
      });
    } catch (error) {
      reject(error);
    }
  });

export const getBookInCartChecked = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Cart.findAll({
        where: { cartUserId: id },
        raw: true,
        nest: true,
        attributes: { exclude: ['id', 'cartUserId'] },
        include: [{
          model: db.Book,
          as: 'books',
          required: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: {
            model: db.CartBook,
            where: {
              isChecked: true
            },
            required: true,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            as: 'cartBooks',
          }
        }],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
      })
      resolve({
        error: response ? 0 : 1, //true: 0 false: 1
        message: response ? 'Success' : 'Cannot get Cart',
        cartData: response
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteBookInCart = (bookCartId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.CartBook.destroy({
        where: { bookCartId },
      });
      resolve({
        error: response > 0 ? 0 : 1, //true: 0 false: 1
        message: `${response} book in cart(s) deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateCheckBookCart = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.CartBook.update({ isChecked: body.isChecked }, {
        where: { bookCartId: body.cartBookId },
      });
      resolve({
        error: response[0] > 0 ? 0 : 1, //true: 0 false: 1
        message: response[0] ? `${response[0]} updated` : 'Cannot update',
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateCheckAllBookCart = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.CartBook.update({
        isChecked: body.isChecked
      },
        {
          where: {
            bookCartId: {
              [Op.in]: body.listCartBookId
            }
          }
        }
      );
      resolve({
        error: response[0] > 0 ? 0 : 1, //true: 0 false: 1
        message: response[0] ? `${response[0]} updated` : 'Cannot update',
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteCheckAllBookCart = (cartBookIds) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.CartBook.destroy({
        where: {
          isChecked: true
        }
      })
      // const response = await db.Cart.destroy({
      //   where: {
      //     cartBookId: {
      //       [Op.in]: cartBookIds
      //     },
      //     isChecked: true
      //   },
      // });
      resolve({
        error: response > 0 ? 0 : 1, //true: 0 false: 1
        message: `${response} book in cart(s) deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateQuantityBookInCart = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Book.update({ quantity: body.quantity }, {
        where: { id: body.bookId },
      });
      resolve({
        error: response[0] > 0 ? 0 : 1, //true: 0 false: 1
        message: response[0] ? `${response[0]} updated` : 'Cannot update',
      });
    } catch (error) {
      reject(error);
    }
  });