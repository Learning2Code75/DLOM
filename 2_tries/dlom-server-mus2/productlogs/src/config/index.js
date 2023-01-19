const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  // const configFile = `./.env.${process.env.NODE_ENV}`;
  const configFile = `${__dirname}/./../../.env`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "PRODUCTS_EXCHANGE",
  EXCHANGE_NAME_PRIME: "PRODUCT_EXCHANGE",
  PRODUCTS_BINDING_KEY: "PRODUCTS_SERVICE",
  QUEUE_NAME: "PRODUCTS_QUEUE",
  QUEUE_NAME_PRIME: "PRODUCTLOGS_QUEUE",
  PRODUCTLOGS_BINDING_KEY: "PRODUCTLOGS_SERVICE",
};
