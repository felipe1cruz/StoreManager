const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/sales/:id', salesController.getSaleById);

router.post('/sales', salesController.createSale);

router.get('/sales', salesController.getAllSales);

router.put('/sales/:id', salesController.saleUpdate);

router.delete('/sales/:id', salesController.saleDelete);

router.use((err, req, res, _next) => {
  const { status, message } = err;
  if (status) return res.status(status).json({ message });
  return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
