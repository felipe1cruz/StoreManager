const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../src/models/products.model');
const conn = require('../../../src/models/connection');
const { allProducts, createdProduct } = require('../../mocks/products.mock');

describe('Teste da rota products na camada model', function () {

  describe('testando se a rota GET /products lista todos os produtos', async function () {
    before(async () => {
      sinon.stub(conn, 'execute').resolves([allProducts])
    });

    after(async () => {
      conn.execute.restore();
    });
    it('testando a funcao getAllProducts', async function () {


      const result = await productsModel.getAllProducts();

      expect(result).to.deep.equal(allProducts);
    });
  });

  describe('testando se a rota GET /products/id lista o produto com id equivalente', async function () {
    before(async () => {
      sinon.stub(conn, 'execute').resolves([allProducts[0]])
    });

    after(async () => {
      conn.execute.restore();
    });
    it('testando a funcao findProductById', async function () {
      const expected = allProducts[0];
      const result = await productsModel.findProductById(1);

      expect(result).to.deep.equal(expected);
    });
  });

    describe('testando se a rota POST /products/ cadastra um produto corretamente', async function () {
      before(async () => {
        sinon.stub(conn, 'execute').resolves([{ insertId: 5 }]);
      });

      after(async () => {
        conn.execute.restore();
      });
      it('testando a funcao productCreate', async function () {

        const expected = createdProduct(5);
        const result = await productsModel.productCreate("Espada do Jaspion");

        expect(result).to.deep.equal(expected);
      });
    });

  describe('testando se a rota PUT /products/:id altera um produto corretamente', async function () {
    before(async () => {
      sinon.stub(conn, 'execute').resolves([createdProduct(5)]);
    });

    after(async () => {
      conn.execute.restore();
    });

    it('testando a funcao productUpdate', async function () {

      const product = {
        name: "Espada do Jaspion",
      };
      const expected = createdProduct(5);
      const result = await productsModel.productUpdate(product);

      expect(result).to.deep.equal(expected);
    });
  });
  describe('testando se a rota DELETE /products/:id deleta um produto corretamente', async function () {
    before(async () => {
      sinon.stub(conn, 'execute').resolves([{ affectedRows: 1 }]);
    });

    after(async () => {
      conn.execute.restore();
    });

    it('testando a funcao productDelete', async function () {


      const result = await productsModel.productDelete(2);

      expect(result.affectedRows).to.equal(1);
    });
  });
  describe('testando se a rota GET /products/search=q? busca um produto', async function () {
    before(async () => {
      sinon.stub(conn, 'execute').resolves([allProducts[0]]);
    });

    after(async () => {
      conn.execute.restore();
    });

    it('testando a funcao searchProductByName', async function () {


      const result = await productsModel.searchProductByName('Martelo');

      expect(result).to.deep.equal(allProducts[0]);
    });
  });
  });

