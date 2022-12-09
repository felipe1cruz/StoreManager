const productService = require('../services/products.service');

const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newProduct = await productService.createProduct(name);
    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const productUpdate = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    const { id } = req.params;
    await productService.productUpdate(id, name);

    return res.status(200).json({ id, name });
  } catch (err) {
    next(err);
  }
};

const productDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await productService.productDelete(id);
    console.log(deleted);
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

const searchProductByName = async (req, res, next) => {
  try {
    const { q } = req.query;
    const result = await productService.searchProductByName(q);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  productUpdate,
  productDelete,
  searchProductByName,
};
