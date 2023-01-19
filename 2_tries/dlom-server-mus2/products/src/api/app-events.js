const ProductService = require("../services/product-service");

module.exports = async (app) => {
  const service = new ProductService();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;
    let prod = await service.SubscribeEvents(payload);
    console.log("Product service received event");
    return res.status(200).json(prod);
  });
};
