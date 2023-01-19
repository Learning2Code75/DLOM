const { PRODUCTS_BINDING_KEY } = require("../config/index.js");
const ProductlogService = require("../services/productlog-service.js");
const { PublishMessage, SubscribeMessage } = require("../utils");

module.exports = async (app, channel) => {
  const service_pl = new ProductlogService();

  try {
    await SubscribeMessage(channel, service_pl);
  } catch (err) {
    console.log(err);
  }

  // GET /productlogs/ : getProductlogs
  app.get("/", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service_pl.GetProductlogs();
      return res.status(200).json(data.products);
    } catch (err) {
      next(err);
    }
  });

  // POST /productlogs/ : createProductlog
  app.post("/", async (req, res, next) => {
    //get payload(Productlog) to send to product-service
    try {
      let prodlog = req.body;

      const payloadData = await service_pl.GetProductlogPayload(
        prodlog,
        "FETCH_PRODUCT"
      );

      // const new_product = await PublishProductEvent(payloadData.data);
      // console.log(JSON.stringify(payloadData.data));
      let stringified_data = JSON.stringify(await payloadData.data);
      console.log("stringified_data:", stringified_data);
      await PublishMessage(channel, PRODUCTS_BINDING_KEY, stringified_data);

      try {
        await SubscribeMessage(channel, service_pl);
      } catch (err) {
        console.log(err);
      }

      // let new_product_data = await new_product.data.data;
      // console.log(new_product_data);

      // let new_formatted_prod_data = {
      //   _id: new_product_data._id.toString(),
      //   prodSKU: new_product_data.prodSKU.toString(),
      //   prodName: new_product_data.prodName.toString(),
      //   productUnitRate: new_product_data.productUnitRate.toString(),
      //   prodTax: new_product_data.prodTax.toString(),
      //   qty: parseInt(new_product_data.qty),
      //   category: new_product_data.category.toString(),
      //   discount: new_product_data.discount.toString(),
      //   damaged: new_product_data.damaged.toString(),
      //   damagedDescription: new_product_data.damagedDescription.toString(),
      // };
      // console.log(new_formatted_prod_data);
      // prodlog.product = { ...new_formatted_prod_data };
      // console.log(prodlog);

      // let { data } = await service_pl.CreateProductlog(prodlog);

      // return res.status(201).json(data);
      return res.status(201).json({ msg: "created productlog" });
    } catch (err) {
      next(err);
    }
  });
};
