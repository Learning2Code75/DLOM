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
}

module.exports = UserService;
