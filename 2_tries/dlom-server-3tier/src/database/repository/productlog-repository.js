const { ProductlogModel } = require("../models");
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

class ProductlogRepository {
  async CreateProductlog(prod) {
    try {
      const newProductlog = new ProductlogModel(prod);
      const productlogResult = await newProductlog.save();
      return productlogResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product log"
      );
    }
  }

  async Productlogs() {
    try {
      return await ProductlogModel.find().populate("product");
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Productlogs"
      );
    }
  }
}

module.exports = ProductlogRepository;
