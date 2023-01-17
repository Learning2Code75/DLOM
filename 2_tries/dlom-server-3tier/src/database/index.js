// database related modules
module.exports = {
  databaseConnection: require("./connection"),
  ProductRepository: require("./repository/product-repository"),
  ProductlogRepository: require("./repository/productlog-repository"),
  OrderlogRepository: require("./repository/orderlog-repository"),
  UserRepository: require("./repository/user-repository.js"),
};
