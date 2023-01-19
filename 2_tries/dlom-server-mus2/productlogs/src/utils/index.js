const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const axios = require("axios");
const amqplib = require("amqplib");

const {
  APP_SECRET,
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
  PRODUCTLOGS_BINDING_KEY,
  EXCHANGE_NAME_PRIME,
  QUEUE_NAME_PRIME,
} = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// module.exports.PublishProductEvent = async (payload) => {
//   return await axios.post("http://localhost:8000/products/app-events", {
//     payload,
//   });
// };

//message broker : rabbitmq

//create a channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (err) {
    throw err;
  }
};

// publish messages
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    console.log(message);
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    console.log("message has been sent from productlogs");
    console.log(Buffer.from(message));
  } catch (err) {
    throw err;
  }
};

// subscribe messages
module.exports.SubscribeMessage = async (channel, service) => {
  const appQueue = await channel.assertQueue(QUEUE_NAME_PRIME);
  let new_prod_log_data = {};
  let new_prod_data = {};
  channel.bindQueue(
    appQueue.queue,
    EXCHANGE_NAME_PRIME,
    PRODUCTLOGS_BINDING_KEY
  );
  channel.consume(appQueue.queue, async (data) => {
    console.log("received data2 ");
    console.log(data.content.toString());
    new_prod_data = await JSON.parse(data.content.toString()).product;
    new_prod_log_data = await JSON.parse(data.content.toString()).productlog;
    new_prod_log_data.product = new_prod_data;

    await service.CreateProductlog(new_prod_log_data);

    await channel.ack(data);
  });
};
