import * as api from "../../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //login user
    const { data } = await api.signIn(formData);

    // console.log(data.result.dlom_client);

    // const { data: dc } = await api.fetchDlomClient(data.result.dlom_client);
    // console.log(dc);
    dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    // signup and login user
    const { data } = await api.signUp(formData);
    // dispatch({ type: "AUTH", data });
    dispatch({ type: "CREATE_USER", payload: data.result.data });
    // navigate("/");
  } catch (error) {
    console.log(error);
  }
};
