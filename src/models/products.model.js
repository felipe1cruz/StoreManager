const connection = require('./connection');

const getAllProducts = async () => {
    const [result] = await connection.execute('SELECT * FROM StoreManager.products');
    return result;
};

const findProductById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [productId]);

  return result;
};

const productCreate = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';

  const [result] = await connection.execute(query, [name]);

  return { id: result.insertId, name };
};

const productUpdate = async (id, name) => {
  const result = await findProductById(id);

  if (!result.length) {
    return result;
  }

  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );

  const alteredResult = await findProductById(id);

  return alteredResult;
};

const productDelete = async (id) => {
  const result = await findProductById(id);

  if (!result.length) {
    return result;
  }

  const deleteResult = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
  return deleteResult;
};

const searchProductByName = async (wordforSearch) => {
  const allSearches = `%${wordforSearch}%`;
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';

  const [result] = await connection.execute(query, [allSearches]);

  return result;
};

module.exports = {
  getAllProducts,
  findProductById,
  productCreate,
  productUpdate,
  productDelete,
  searchProductByName,
};
