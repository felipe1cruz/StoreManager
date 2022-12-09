const camelize = require('camelize');
const conn = require('./connection');

const salesDate = async () => {
  const query = 'INSERT INTO StoreManager.sales(date) VALUES(NOW())';
  const [result] = await conn.execute(query);
  return result.insertId;
};

const newSale = async (arrProducts) => {
  const saleId = await salesDate();
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES(?, ?, ?)`;

  arrProducts.map(async (product) => {
    const [result] = await conn.execute(query,
      [saleId, product.productId, product.quantity]);
    return result;
  });

  return saleId;
};

const getAllSales = async () => {
  const query = `SELECT p.sale_id, s.date, p.product_id, p.quantity
    FROM StoreManager.sales_products AS p
    JOIN StoreManager.sales AS s
    ON p.sale_id = s.id
    ORDER BY p.sale_id, p.product_id`;
  const [result] = await conn.execute(query);

  return camelize(result);
};

const getSaleById = async (id) => {
  const query = `SELECT s.date, p.product_id, p.quantity
      FROM StoreManager.sales_products AS p
      JOIN StoreManager.sales AS s
      ON p.sale_id = s.id
      WHERE p.sale_id = ?
      ORDER BY p.sale_id, p.product_id`;
  const [result] = await conn.execute(query, [id]);

  return camelize(result);
};

const saleDelete = async (id) => {
  const result = await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [id],
  );

  return result;
};

const saleUpdate = async (saleId, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ?`;

  await conn.execute(query, [quantity, saleId, productId]);
};

module.exports = {
  salesDate,
  getAllSales,
  newSale,
  getSaleById,
  saleDelete,
  saleUpdate,
};
