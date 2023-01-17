const ProductService = require("../services/product-service");

module.exports = (app) => {
  const service = new ProductService();

  // GET /products/ : getProducts
  app.get("/products/", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data.products);
    } catch (err) {
      next(err);
    }
  });

  // POST /products/ : createProduct
  app.post("/products/", async (req, res, next) => {
    try {
      const prod = req.body;
      const { data } = await service.CreateProduct(prod);
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  // PATCH /products/:id : updateProduct
  app.patch("/products/:id", async (req, res, next) => {
    try {
      const { id: _id } = req.params;
      const prod = req.body;
      const { data } = await service.UpdateProduct({ _id, prod });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
  // DELETE /products/:id : deleteProduct
  app.delete("/products/:id", async (req, res, next) => {
    try {
      const { id: _id } = req.params;
      const { data } = await service.DeleteProduct({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
