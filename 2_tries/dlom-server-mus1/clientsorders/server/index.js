const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema.js");
const dlomSchema = require("./schema/DlomSchema.js");
const connectDB = require("./config/db.js");

// const port = process.env.PORT || 5001;
const port2 = process.env.PORT2 || 5002;

// const app = express();
const app2 = express();

// connect to db :
connectDB();
// app.use(cors());
app2.use(cors());

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV === "development",
//   })
// );

app2.use(
  "/graphql",
  graphqlHTTP({
    schema: dlomSchema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// app.listen(port, console.log(`Server running on port${port}`));
app2.listen(port2, console.log(`Server2 running on port ${port2}`));
