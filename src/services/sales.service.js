const Joi = require('joi');
const errorGenerate = require('../utils/genericErrorHandler');
const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const salesSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required().min(1),
});

const checkProductsSchema = async (salesList) => {
  salesList.map(({ productId, quantity }) => {
    const { error } = salesSchema.validate({ productId, quantity });
    if (!error) {
      return null;
    }
    if (error.details[0].type === 'string.min' || error.details[0].type === 'number.min') {
      throw errorGenerate(422, error.message, error.details[0].type);
    }
    if (error) throw errorGenerate(400, error.message, error.details[0].type);
    return null;
  });
};

const checkProducts = async (salesList) => {
  await checkProductsSchema(salesList);
  const productIds = salesList.map(({ productId }) => productId);
  const allProducts = await productsModel.getAllProducts();

  return productIds.every((productId) =>
    allProducts.some(({ id }) => id === productId));
};

const createSale = async (salesList) => {
  const checkedProducts = await checkProducts(salesList);
  if (!checkedProducts) {
    throw errorGenerate(404, 'Product not found');
  }
  const newSale = await salesModel.newSale(salesList);
  return newSale;
};

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const saleId = await salesModel.getSaleById(id);
  if (!saleId.length) {
    throw errorGenerate(404, 'Sale not found');
  }
  return saleId;
};

const saleDelete = async (id) => {
  const findSale = await salesModel.getSaleById(id);
  if (!findSale.length) {
    throw errorGenerate(404, 'Sale not found');
  }
  const result = await salesModel.saleDelete(id);
  return result;
};

const saleUpdate = async (productsArray, saleId) => {
  const findSale = await salesModel.getSaleById(saleId);

  if (!findSale.length) {
    throw errorGenerate(404, 'Sale not found');
  }

  const checkedProducts = await checkProducts(productsArray);
  if (!checkedProducts) {
    throw errorGenerate(404, 'Product not found');
  }

  await Promise.all(productsArray.map(async ({ productId, quantity }) => {
    await salesModel.saleUpdate(saleId, productId, quantity);
  }));
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  saleDelete,
  saleUpdate,
};
