const { OrderlogModel } = require("../models");
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

class OrderlogRepository {
  async CreateOrderlog(ord) {
    try {
      const newOrderlog = new OrderlogModel(ord);
      const orderlogResult = await newOrderlog.save();
      return orderlogResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Order log"
      );
    }
  }

  async Orderlogs() {
    try {
      return await OrderlogModel.find();
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Orderlogs"
      );
    }
  }
}

module.exports = OrderlogRepository;
