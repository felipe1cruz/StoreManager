const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
];

const createdProduct = (id) => ({
  id,
  name: "Espada do Jaspion",
});

const createdProductService = {
  id: {
    id: { id: 5, name: 'Espada do Jaspion' },
    name: 'Espada do Jaspion'
  },
  name: 'Espada do Jaspion'
};

const stringMinError = {
  message: '"name" length must be at least 5 characters long',
}

const reqNameError = {
  message: '"name" is required',
}

const productNotFound = {
  message: 'Product not found',
}





module.exports = {
  allProducts,
  createdProduct,
  stringMinError,
  reqNameError,
  productNotFound,
  createdProductService,
}
