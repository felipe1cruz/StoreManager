const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const {
  allProducts,
  createdProduct,
  stringMinError,
  reqNameError,
  productNotFound,
} = require('../../mocks/products.mock');

describe('Teste na camada Service', function () {
  describe('testando se é possível criar um novo produto com sucesso', async function () {
    before(async () => {
      sinon.stub(productsModel, 'productCreate').resolves(createdProduct(5));
    });

    after(async () => {
      productsModel.productCreate.restore();
    });
    it('teste da funcao createProduct ', async function () {
      const expected = createdProduct(5);

      const result = await productsService.createProduct("Espada do Jaspion");

      expect(result).to.deep.equal(expected);
    });
  });

  describe('testando se é possível atualizar um novo produto com sucesso', async function () {
    before(async () => {
      sinon.stub(productsModel, 'productUpdate').resolves([{ id: 5, name: 'produto 1' }]);
    });

    after(async () => {
      productsModel.productUpdate.restore();
    });
    it('permite atualizar um produto com sucesso', async function () {
      const expected = [{ id: 5, name: 'produto 1' }];

      const result = await productsService.productUpdate(5, 'produto 1');

      expect(result).to.deep.equal(expected);
    });

    describe('testando se é possível deletar um produto com sucesso', async function () {
      before(async () => {
        sinon.stub(productsModel, 'findProductById').resolves([{ id: 2, name: 'Traje de encolhimento' }]);
        sinon.stub(productsModel, 'productDelete').resolves({ affectedRows: 1 });
      });

      after(async () => {
        productsModel.productDelete.restore();
        productsModel.findProductById.restore();
      });
      it('funcao productDelete', async function () {

        const result = await productsService.productDelete(2);

        expect(result).to.deep.equal({ affectedRows: 1 });
      });
    });
  });
  describe('testando se é possivel buscar um produto por query', async function () {
    before(async () => {
      sinon.stub(productsModel, 'searchProductByName').resolves({ id: 1, name: 'Martelo de Thor' });
    });

    after(async () => {
      productsModel.searchProductByName.restore();
    });
    it('funcao searchProductByName', async function () {

      const result = await productsService.searchProductByName('Martelo');

      expect(result).to.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });
  });
});
