const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel, CreateChannelPrime } = require("./utils");

const StartServer = async () => {
  const app = express();

  await databaseConnection();
  let channel = "";
  let channel_prime = "";
  const connectWithRetry = async () => {
    try {
      channel = await CreateChannel();
      channel_prime = await CreateChannelPrime();
    } catch (err) {
      // console.log(err);
      setTimeout(connectWithRetry, 5000);
    }
  };

  await connectWithRetry();

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
