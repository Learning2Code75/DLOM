export default (dlomclients = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_DLOMCLIENTS":
      return action.payload;
    case "CREATE_DLOMCLIENT":
      return [...dlomclients, action.payload];
    case "UPDATE_DLOMCLIENT":
      return dlomclients.map((u) =>
        u._id === action.payload._id ? action.payload : u
      );
    case "DELETE_DLOMCLIENT":
      return dlomclients.filter((u) => u._id !== action.payload.dcId);
    default:
      return dlomclients;
  }
};
