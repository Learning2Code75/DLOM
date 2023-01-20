const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel, CreateChannelPrime } = require("./utils");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  const channel = await CreateChannel();
  const channel_prime = await CreateChannelPrime();

  await expressApp(app, channel, channel_prime);

  app
    .listen(PORT, () => {
      console.log(`productlogs listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
