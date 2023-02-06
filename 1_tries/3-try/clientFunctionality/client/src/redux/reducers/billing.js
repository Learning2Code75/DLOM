const authReducer = (billing = [], action) => {
  switch (action.type) {
    case "GET_BILLING":
      return [...action.payload];

    default:
      return billing;
  }
};
export default authReducer;
