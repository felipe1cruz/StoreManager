const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../src/models/sales.model');
const conn = require('../../../src/models/connection');
const { allSales } = require('../../mocks/sales.mock');

describe('Teste da rota sales na camada model', function () {
  beforeEach(sinon.restore);
  it('testando se a rota /sales tras todas a vendas', async function () {
    sinon.stub(conn, 'execute').resolves([allSales]);
    const expected = allSales;
    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(expected);
  });
  it('testando se a rota /sales/:id tras uma venda específica', async function () {
    sinon.stub(conn, 'execute').resolves([allSales[0]]);
    const expected = allSales[0];
    const result = await salesModel.getSaleById(1);

    expect(result).to.deep.equal(expected);
  });
  it('testando se a rota /sales é possível cadastrar uma venda', async function () {
    sinon.stub(conn, 'execute').resolves([{ insertId: 1}]);

    const sale = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    const result = await salesModel.newSale(sale);

    expect(result).to.deep.equal(1);
  });
  it('testando se a funcao salesDate insere uma nova data de venda', async function () {
    sinon.stub(conn, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModel.salesDate();

    expect(result).to.deep.equal(1);
  });






});
