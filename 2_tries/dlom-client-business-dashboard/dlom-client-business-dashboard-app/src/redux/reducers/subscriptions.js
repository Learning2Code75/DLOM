export default (subs = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_SUBS":
      return action.payload;
    case "CREATE_SUB":
      return [...subs, action.payload];
    case "UPDATE_SUB":
      return subs.map((u) =>
        u._id === action.payload._id ? action.payload : u
      );
    case "DELETE_SUB":
      return subs.filter((u) => u._id !== action.payload.sId);
    default:
      return subs;
  }
};
