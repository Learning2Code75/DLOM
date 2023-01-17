const { ProductlogRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class ProductlogService {
  constructor() {
    this.repository = new ProductlogRepository();
  }

  async GetProductlogs() {
    try {
      const products = await this.repository.Productlogs();

      return FormateData({
        products,
      });
    } catch (err) {
      throw new APIError("Productlogs Not found");
    }
  }

  async CreateProductlog(productInputs) {
    try {
      const productResult = await this.repository.CreateProductlog(
        productInputs
      );
      return FormateData(productResult);
    } catch (err) {
      throw new APIError("Productlog Not created");
    }
  }
}

module.exports = ProductlogService;
