import * as api from "../../api";

export const getTrackings = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTrackings();

    dispatch({ type: "FETCH_ALL_TRACKINGS", payload: data });
  } catch (err) {
    console.log(err);
  }
};
// export const createSubscription = (formData) => async (dispatch) => {
//   try {
//     const { data } = await api.createSubscription(formData);
//     dispatch({ type: "CREATE_SUB", payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const updateSubscription = (subId, subData) => async (dispatch) => {
//   try {
//     console.log(subId, subData);
//     const { data } = await api.updateSubscription(subId, subData);
//     console.log(data);

//     dispatch({ type: "UPDATE_SUB", payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const deleteSubscription = (sId) => async (dispatch) => {
//   try {
//     // console.log(userId);
//     await api.deleteSubscription(sId);
//     dispatch({ type: "DELETE_SUB", payload: { sId } });
//   } catch (err) {}
// };
