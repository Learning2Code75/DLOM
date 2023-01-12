export default (products = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...products, action.payload];
    case "UPDATE":
      return products.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    case "DELETE":
      return products.filter((p) => p._id !== action.payload.prodId);
    default:
      return products;
  }
};
