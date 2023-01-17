const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async GetProducts() {
    try {
      const products = await this.repository.Products();

      return FormateData({
        products,
      });
    } catch (err) {
      throw new APIError("Products Not found");
    }
  }

  async CreateProduct(productInputs) {
    try {
      const productResult = await this.repository.CreateProduct(productInputs);
      return FormateData(productResult);
    } catch (err) {
      throw new APIError("Product Not created");
    }
  }

  async UpdateProduct(productInputs) {
    let { _id, prod } = productInputs;
    try {
      const productResult = await this.repository.UpdateProduct(_id, prod);
      return FormateData(productResult);
    } catch (err) {
      throw new APIError("Product Not updated");
    }
  }

  async DeleteProduct(productInputs) {
    let { _id } = productInputs;
    try {
      const productResult = await this.repository.DeleteProduct(_id);
      return FormateData(productResult);
    } catch (err) {
      throw new APIError("Product Not deleted");
    }
  }
}

module.exports = ProductService;
