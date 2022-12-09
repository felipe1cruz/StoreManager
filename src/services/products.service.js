const Joi = require('joi');
const errorGenerate = require('../utils/genericErrorHandler');
const productsModel = require('../models/products.model');

const productSchema = Joi.object({
  name: Joi.string().required().min(5),
});

const createProduct = async (productName) => {
  const { error } = await productSchema.validate({ name: productName });
  if (!error) {
    const newProductId = await productsModel.productCreate(productName);
    return newProductId;
  }
  if (error.details[0].type === 'string.min') {
    throw errorGenerate(422, error.message, error.details[0].type);
  }
  if (error) {
    throw errorGenerate(400, error.message, error.details[0].type);
  }
};

const productUpdate = async (id, productName) => {
  const { error } = await productSchema.validate({ name: productName });
  if (!error) {
    const updated = await productsModel.productUpdate(id, productName);
    if (!updated.length) {
      throw errorGenerate(404, 'Product not found');
    }
    return updated;
  }
  if (error.details[0].type === 'string.min') {
    throw errorGenerate(422, error.message, error.details[0].type);
  }
  if (error) throw errorGenerate(400, error.message, error.details[0].type);
};

const productDelete = async (id) => {
  const findProduct = await productsModel.findProductById(id);
  if (!findProduct.length) {
    throw errorGenerate(404, 'Product not found');
  }
  const deleted = await productsModel.productDelete(id);
  return deleted;
};

const searchProductByName = async (wordForSearch) => {
  if (!wordForSearch) {
    const result = await productsModel.getAllProducts();
    return result;
  }
  const result = await productsModel.searchProductByName(wordForSearch);
  return result;
};

module.exports = {
  createProduct,
  productUpdate,
  productDelete,
  searchProductByName,
};
