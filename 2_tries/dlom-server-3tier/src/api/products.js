const ProductService = require("../services/product-service");

module.exports = (app) => {
  const service = new ProductService();

  // GET /products/ : getProducts
  app.get("/products/", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (error) {
      next(err);
    }
  });

  // POST /products/ : createProduct
  // PATCH /products/:id : updateProduct
  // DELETE /products/:id : deleteProduct
};
