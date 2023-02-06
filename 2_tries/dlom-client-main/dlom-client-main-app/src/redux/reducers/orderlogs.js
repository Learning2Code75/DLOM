export default (orderlogs = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_ORDER_LOGS":
      return action.payload;
    case "CREATE_ORDER_LOG":
      return [...orderlogs, action.payload];
    default:
      return orderlogs;
  }
};
