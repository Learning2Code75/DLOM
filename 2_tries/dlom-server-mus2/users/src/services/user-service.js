const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async GetUsers() {
    try {
      const users = await this.repository.Users();

      return FormateData({
        users,
      });
    } catch (err) {
      throw new APIError("Users Not found");
    }
  }

  async CheckExistingUser({ email }) {
    try {
      const eUser = await this.repository.CheckExistingUser({ email });
      if (eUser) {
        return eUser;
      } else {
        return false;
      }
    } catch (err) {
      throw new APIError("Existing User Not found");
    }
  }

  CheckPasswords({ password, cpassword }) {
    return password !== cpassword;
  }

  async HashPassword({ password }) {
    try {
      const hp = await bcrypt.hash(password, 12);
      return hp;
    } catch (err) {
      throw new APIError("Unable to hash password");
    }
  }

  async CreateUser({
    email,
    password,
    hashedPassword,
    firstName,
    lastName,
    userRole,
  }) {
    password = hashedPassword;
    let name = `${firstName} ${lastName}`;

    try {
      const userResult = await this.repository.CreateUser({
        email,
        password,
        name,
        userRole,
      });
      return FormateData(userResult);
    } catch (err) {
      throw new APIError("Unable to create user");
    }
  }

  SignToken(result) {
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "8h",
    });
    return token;
  }

  SignLoginToken(existingUser) {
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    return token;
  }

  async CheckPasswordCorrectness(pass, existingPass) {
    try {
      const isPasswordCorrect = await bcrypt.compare(pass, existingPass);
      return isPasswordCorrect;
    } catch (err) {
      throw new APIError("Passwords not correct");
    }
  }

  async UpdateUser(userInputs) {
    let { _id, user, hashedPassword } = userInputs;
    try {
      user.password = hashedPassword;
      user.name = `${user.firstName} ${user.lastName}`;

      const userResult = await this.repository.UpdateUser(_id, user);
      return FormateData(userResult);
    } catch (err) {
      throw new APIError("User Not updated");
    }
  }

  async DeleteUser(userInputs) {
    let { _id } = userInputs;
    try {
      console.log(_id);
      const userResult = await this.repository.DeleteUser(_id);
      return FormateData(userResult);
    } catch (err) {
      throw new APIError("User Not deleted");
    }
  }
}

module.exports = UserService;
