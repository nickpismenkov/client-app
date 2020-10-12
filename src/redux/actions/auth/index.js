import axios from "axios";

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};

export const registrationUser = (user) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/registration`, user)
      .then((response) => {
        localStorage.setItem("__user", JSON.stringify(response.data));

        dispatch({
          type: "LOGIN_WITH_EMAIL",
          payload: response.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.error);
        }
      });
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/login`, user)
      .then((response) => {
        localStorage.setItem("__user", JSON.stringify(response.data));

        dispatch({
          type: "LOGIN_WITH_EMAIL",
          payload: response.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.error);
        }
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    if (JSON.stringify(localStorage.getItem("__user")) !== "{}") {
      dispatch({
        type: "LOGIN_WITH_EMAIL",
        payload: JSON.parse(localStorage.getItem("__user")),
      });
    }
  };
};

export const logOutUser = (user) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/logout`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("__user", JSON.stringify({}));
        dispatch({
          type: "LOGIN_WITH_EMAIL",
          payload: {},
        });
        alert(response.data.message);
      });
  };
};
