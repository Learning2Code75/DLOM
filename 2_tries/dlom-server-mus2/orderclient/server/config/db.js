const mongoose = require("mongoose");
const { DB_URL } = require(".");
const connectDB = async () => {
  const conn = await mongoose.connect(DB_URL);
  console.log(
    `MongoDB connected : ${conn.connection.host}  ${conn.connection.port}`.cyan
      .underline.bold
  );
};

module.exports = connectDB;
