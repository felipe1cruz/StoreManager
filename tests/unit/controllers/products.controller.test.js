const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controler');
const {
  allProducts,
  createdProduct,
  stringMinError,
  reqNameError,
  productNotFound,
  createdProductService,
} = require('../../mocks/products.mock');

describe('Teste na camada Controller', function () {
  describe('testando se é possível criar um novo produto com sucesso', async function () {
    const req = { body: createdProduct(5) };
    const res = {};
    const next = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    before(async () => {
      sinon.stub(productsService, 'createProduct').resolves(createdProduct(5));
    });

    after(async () => {
      productsService.createProduct.restore();
    });
    it('teste do retorno da funcao createProduct createProduct ', async function () {
      const expected = createdProduct(5);

      await productsController.createProduct(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdProduct(5))).to.be.true;
    });
  });

  describe('testando se é possível atualizar um produto com sucesso', async function () {
    const req = {
      body: { name: 'produto 1' },
      params: { id: 5 },
    };
    const res = {};
    const next = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    before(async () => {
      sinon.stub(productsService, 'productUpdate').resolves([{ id: 5, name: 'produto 1' }]);
    });

    after(async () => {
      productsService.productUpdate.restore();
    });
    it('teste do retorno da funcao productUpdate ', async function () {

      await productsController.productUpdate(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
    });
  });

});
