export default (users = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_USERS":
      return action.payload;
    case "CREATE_USER":
      return [...users, action.payload];
    case "UPDATE_USER":
      return users.map((u) =>
        u._id === action.payload._id ? action.payload : u
      );
    case "DELETE_USER":
      return users.filter((u) => u._id !== action.payload.userId);
    default:
      return users;
  }
};
