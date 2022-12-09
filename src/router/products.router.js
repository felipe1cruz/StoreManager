const express = require('express');
const productModel = require('../models/products.model');
const productsControler = require('../controllers/products.controler');

const router = express.Router();

router.get('/products/search', productsControler.searchProductByName);

router.get('/products', async (req, res) => {
  const allProducts = await productModel.getAllProducts();

  return res.status(200).json(allProducts);
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const productId = await productModel.findProductById(id);
  if (!productId.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(productId[0]);
});

router.put('/products/:id', productsControler.productUpdate);

router.post('/products', productsControler.createProduct);

router.delete('/products/:id', productsControler.productDelete);

router.use((err, req, res, _next) => {
  const { status, message } = err;
  if (status) return res.status(status).json({ message });
  return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
