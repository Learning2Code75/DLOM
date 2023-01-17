const OrderlogService = require("../services/orderlog-service.js");

module.exports = (app) => {
  const service_ol = new OrderlogService();

  // GET /orderlogs/ : getOrderlogs
  app.get("/orderlogs/", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service_ol.GetOrderlogs();
      return res.status(200).json(data.orderlogs);
    } catch (err) {
      next(err);
    }
  });

  // POST /orderlogs/ : createOrderlog
  app.post("/orderlogs/", async (req, res, next) => {
    try {
      const ord = req.body;
      const { data } = await service_ol.CreateOrderlog(ord);
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
};
