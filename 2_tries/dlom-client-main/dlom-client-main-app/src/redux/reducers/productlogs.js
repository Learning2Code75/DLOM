export default (productlogs = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCT_LOGS":
      return action.payload;
    case "CREATE_PRODUCT_LOG":
      return [...productlogs, action.payload];
    default:
      return productlogs;
  }
};
