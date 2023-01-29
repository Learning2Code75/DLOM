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
  async Users() {
    try {
      return await UserModel.find().select("-password");
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Users"
      );
    }
  }

  async UpdateUser(_id, user) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new APIError(
        "API Error",
        STATUS_CODES.NOT_FOUND,
        "No user with that id"
      );
    }
    try {
      console.log("rep user", user);
      const updatedUser = await UserModel.findByIdAndUpdate(
        _id,
        { ...user, _id },
        { new: true }
      );
      return updatedUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Error Updating the user"
      );
    }
  }

  async DeleteUser(_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new APIError(
        "API Error",
        STATUS_CODES.NOT_FOUND,
        "No user with that id"
      );
    }
    console.log(_id);
    await UserModel.findByIdAndRemove(_id);
    return { message: "User deleted successfully" };
  }
}

module.exports = UserRepository;
