const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");

const {
  APP_SECRET,
  QUEUE_NAME,
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  PRODUCTS_BINDING_KEY,
  PRODUCTLOGS_BINDING_KEY,
  EXCHANGE_NAME_PRIME,
} = require("../config");
const { ProductRepository } = require("../database");
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
    await channel.publish(
      EXCHANGE_NAME_PRIME,
      binding_key,
      Buffer.from(message)
    );
  } catch (err) {
    throw err;
  }
};

// subscribe messages
module.exports.SubscribeMessage = async (channel, service) => {
  try {
    const appQueue = await channel.assertQueue(QUEUE_NAME);
    let prod_id = "a";
    let prodlog = {};
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, PRODUCTS_BINDING_KEY);
    channel.consume(appQueue.queue, async (data) => {
      console.log("received data1 ");
      console.log(data.content.toString());
      // console.log(JSON.parse(data.content.toString()).data.product._id);
      prod_id = await JSON.parse(
        data.content.toString()
      ).data.product._id.toString();
      prodlog = await JSON.parse(data.content.toString()).data2.productlog;

      // console.log(prod_id);
      // let prod = await service.PublishFoundProduct(prod_id);
      let prod = await new ProductRepository().FindProductById(prod_id);
      console.log(prod);

      let prod_to_send = JSON.stringify({
        product: {
          _id: prod.id,
          prodSKU: prod.prodSKU,
          prodName: prod.prodName,
          productUnitRate: prod.productUnitRate,
          prodTax: prod.prodTax,
          qty: prod.qty,
          category: prod.category,
          discount: prod.discount,
          damaged: prod.damaged,
          damagedDescription: prod.damagedDescription,
        },
        productlog: {
          ...prodlog,
        },
      });

      console.log("prod_toSend=", prod_to_send);

      await this.PublishMessage(channel, PRODUCTLOGS_BINDING_KEY, prod_to_send);

      channel.ack(data);
    });

    // let prod = await service.PublishFoundProduct();
  } catch (err) {
    console.log(err);
  }
};
