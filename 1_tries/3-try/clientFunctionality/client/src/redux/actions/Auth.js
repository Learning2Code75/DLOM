import * as api from "../../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //login user
    const { data } = await api.signIn(formData);
    console.log(data);
    dispatch({ type: "AUTH", data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // signup and login user
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
