const { OrderlogRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class OrderlogService {
  constructor() {
    this.repository = new OrderlogRepository();
  }

  async GetOrderlogs() {
    try {
      const orderlogs = await this.repository.Orderlogs();

      return FormateData({
        orderlogs,
      });
    } catch (err) {
      throw new APIError("Orderlogs Not found");
    }
  }

  async CreateOrderlog(orderlogInputs) {
    try {
      const orderlogResult = await this.repository.CreateOrderlog(
        orderlogInputs
      );
      return FormateData(orderlogResult);
    } catch (err) {
      throw new APIError("Orderlog Not created");
    }
  }
}

module.exports = OrderlogService;
