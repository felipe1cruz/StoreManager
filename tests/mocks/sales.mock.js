const allSales = [
  {
    saleId: 1,
    date: "2022-09-12T11:01:53.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-09-12T11:01:53.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-09-12T11:01:53.000Z",
    productId: 3,
    quantity: 15,
  },
];

const findAByIdResponse = [
  {
    date: "2022-09-12T11:01:53.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-09-12T11:01:53.000Z",
    productId: 2,
    quantity: 10,
  },
];

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

module.exports = {
  allSales,
  newSale,
  findAByIdResponse,
};
