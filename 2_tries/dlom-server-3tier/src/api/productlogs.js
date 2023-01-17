const ProductlogService = require("../services/productlog-service.js");

module.exports = (app) => {
  const service_pl = new ProductlogService();

  // GET /productlogs/ : getProductlogs
  app.get("/productlogs/", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service_pl.GetProductlogs();
      return res.status(200).json(data.products);
    } catch (err) {
      next(err);
    }
  });

  // POST /productlogs/ : createProductlog
  app.post("/productlogs/", async (req, res, next) => {
    try {
      const prod = req.body;
      const { data } = await service_pl.CreateProductlog(prod);
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
};
