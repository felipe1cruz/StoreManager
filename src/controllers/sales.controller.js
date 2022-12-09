const salesService = require('../services/sales.service');

const createSale = async (req, res, next) => {
  try {
    const itemsSold = req.body;
    const id = await salesService.createSale(itemsSold);

    return res.status(201).json({ id, itemsSold });
  } catch (err) {
    next(err);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const allSales = await salesService.getAllSales();

    return res.status(200).json(allSales);
  } catch (err) {
    next(err);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleId = await salesService.getSaleById(id);
    return res.status(200).json(saleId);
  } catch (err) {
    next(err);
  }
};

const saleDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.saleDelete(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const saleUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsUpdated = req.body;
    await salesService.saleUpdate(itemsUpdated, id);
    return res.status(200).json({ saleId: id, itemsUpdated });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  saleDelete,
  saleUpdate,
};
