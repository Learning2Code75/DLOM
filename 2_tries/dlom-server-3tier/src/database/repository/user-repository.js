const { UserModel } = require("../models");
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

class UserRepository {
  async CheckExistingUser({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email });
      return existingUser;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Existing User"
      );
    }
  }

  async CreateUser({ email, password, name, userRole }) {
    try {
      const user = await UserModel.create({
        email,
        password,
        name,
        userRole,
      });
      return user;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create User"
      );
    }
  }
}

module.exports = UserRepository;
