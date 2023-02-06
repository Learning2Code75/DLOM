export default (billings = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_BILLINGS":
      return action.payload;
    case "CREATE_BILLING":
      return [...billings, action.payload];
    case "UPDATE_BILLING":
      return billings.map((u) =>
        u._id === action.payload._id ? action.payload : u
      );
    case "DELETE_BILLING":
      return billings.filter((u) => u._id !== action.payload.bId);
    default:
      return billings;
  }
};
