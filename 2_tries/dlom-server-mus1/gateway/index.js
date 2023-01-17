const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/orderlogs", proxy("http://localhost:8001"));
app.use("/productlogs", proxy("http://localhost:8002"));
app.use("/products", proxy("http://localhost:8003"));
// app.use('/users',proxy('http://localhost:8004'))
app.use("/", proxy("http://localhost:8004")); // root : users

app.listen(8000, () => {
  console.log("gateway : 8000");
});
