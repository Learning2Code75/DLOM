const express = require("express");
const cors = require("cors");
const { products, appEvents } = require("./api");
const HandleErrors = require("./utils/error-handler");
const bodyParser = require("body-parser");

module.exports = async (app, channel, channel_prime) => {
  //   app.use(bodyParser.json({ limit: "30mb", extended: true }));
  //   app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
  app.use(express.json({ extended: true, limit: "30mb" }));
  app.use(express.urlencoded({ extended: true, limit: "30mb" }));

  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //Listen to events :
  // appEvents(app);

  //api
  products(app, channel, channel_prime);

  // error handling
  app.use(HandleErrors);
};
