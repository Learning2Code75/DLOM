const { ProductModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");
const mongoose = require("mongoose");
const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

//Dealing with data base operations

class ProductRepository {
  async CreateProduct(prod) {
    try {
      const newProduct = new ProductModel(prod);
      const productResult = await newProduct.save();
      return productResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  async Products() {
    try {
      return await ProductModel.find();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  async FindProductById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to find Product"
      );
    }
  }

  async UpdateProduct(_id, prod) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new APIError(
        "API Error",
        STATUS_CODES.NOT_FOUND,
        "No product with that id"
      );
    }
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        _id,
        { ...prod, _id },
        { new: true }
      );
      return updatedProduct;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Error Updating the product"
      );
    }
  }

  async DeleteProduct(_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new APIError(
        "API Error",
        STATUS_CODES.NOT_FOUND,
        "No product with that id"
      );
    }
    await ProductModel.findByIdAndRemove(_id);
    return { message: "Product deleted successfully" };
  }
}

module.exports = ProductRepository;
