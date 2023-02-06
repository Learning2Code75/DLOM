export default (trackings = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_TRACKINGS":
      return action.payload;
    default:
      return trackings;
  }
};
