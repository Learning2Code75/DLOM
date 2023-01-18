const ProductlogService = require("../services/productlog-service.js");
const { PublishProductEvent } = require("../utils");

module.exports = (app) => {
  const service_pl = new ProductlogService();

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
        prodlog.product,
        "FETCH_PRODUCT"
      );

      const new_product = await PublishProductEvent(payloadData.data);
      console.log("hi1", new_product.data.data);

      // let new_prod_data = {
      // _id: await new_product.data.data._id.toString(),
      // prodSKU: await new_product.data.data.prodSKU.toString(),
      // prodName: await new_product.data.data.prodName.toString(),
      // productUnitRate: await new_product.data.data.productUnitRate.toString(),
      // prodTax: await new_product.data.data.prodTax.toString(),
      // qty: parseInt(await new_product.data.data.qty),
      // category: await new_product.data.data.category.toString(),
      // discount: await new_product.data.data.discount.toString(),
      // damaged: await new_product.data.data.damaged.toString(),
      // damagedDescription:
      //     await new_product.data.data.damagedDescription.toString(),
      // };

      let new_product_data = await new_product.data.data;
      console.log(new_product_data);

      // data.product = await new_product.data.data;
      let new_formatted_prod_data = {
        _id: new_product_data._id.toString(),
        prodSKU: new_product_data.prodSKU.toString(),
        prodName: new_product_data.prodName.toString(),
        productUnitRate: new_product_data.productUnitRate.toString(),
        prodTax: new_product_data.prodTax.toString(),
        qty: parseInt(new_product_data.qty),
        category: new_product_data.category.toString(),
        discount: new_product_data.discount.toString(),
        damaged: new_product_data.damaged.toString(),
        damagedDescription: new_product_data.damagedDescription.toString(),
      };
      console.log(new_formatted_prod_data);
      prodlog.product = { ...new_formatted_prod_data };
      console.log(prodlog);

      let { data } = await service_pl.CreateProductlog(prodlog);

      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
};
