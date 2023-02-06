const authReducer = (dlomclient = {}, action) => {
  switch (action.type) {
    case "GET_DC":
      let new_dlom_client = { ...dlomclient };
      new_dlom_client = action.payload;
      return { ...new_dlom_client };

    default:
      return dlomclient;
  }
};
export default authReducer;
