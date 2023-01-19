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

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    switch (event) {
      case "TEST":
        console.log("working... subscriber");
      case "FETCH_PRODUCT":
        console.log(
          "finding product from database , returning the product details"
        );
        const foundProduct = await this.repository.FindProductById(
          data.product._id
        );
        return FormateData(foundProduct);
      default:
        break;
    }
  }

  async PublishFoundProduct(payload) {
    try {
      console.log(payload);
      const foundProduct = await this.repository.FindProductById(payload);
      console.log(foundProduct);
      return FormateData(foundProduct);
    } catch (err) {
      throw new APIError("Product Not found");
    }
  }
}

module.exports = ProductService;
