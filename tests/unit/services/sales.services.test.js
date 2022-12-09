const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');
const { allSales, newSale, findAByIdResponse } = require('../../mocks/sales.mock');

describe('Teste da rota sales na camada services', function () {

  describe('testando se a rota GET /sales lista todos as vendas', async function () {
    before(async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(allSales);
    });

    after(async () => {
      salesModel.getAllSales.restore();
    });
    it('testando a funcao createSale', async function () {


      const result = await salesService.getAllSales();

      expect(result).to.deep.equal(allSales);
    });
  });

  describe('testando se a rota GET /sales/:id tras uma venda específica', async function () {
    before(async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(findAByIdResponse);
    });

    after(async () => {
      salesModel.getSaleById.restore();
    });
    it('testando a funcao getSaleById', async function () {


      const result = await salesService.getSaleById(1);

      expect(result).to.deep.equal(findAByIdResponse);
    });
  });
});
