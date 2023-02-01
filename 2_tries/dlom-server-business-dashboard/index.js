import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import dlomClientsRoutes from "./routes/dlomclients.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import trackingRoutes from "./routes/trackings.js";
import billingRoutes from "./routes/billings.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use("/orders", orderRoutes);
// app.use("/orderlogs", orderlogsRoutes);
// app.use("/products", productRoutes);
// app.use("/productlogs", productlogsRoutes);
// app.use("/users", userRoutes);

app.use("/dlomclients", dlomClientsRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/trackings", trackingRoutes);
app.use("/billings", billingRoutes);
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
