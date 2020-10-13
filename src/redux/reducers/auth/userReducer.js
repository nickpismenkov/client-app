export const user = (
  state = { userRole: "admin", alert: { text: "", status: false } },
  action
) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return {
        ...state,
        ...action.payload.user,
        token: action.payload.token,
      };
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole };
    }
    case "OPEN_ALERT": {
      return { ...state, alert: { text: action.payload, status: true } };
    }
    case "CLOSE_ALERT": {
      return { ...state, alert: { text: "", status: false } };
    }
    default: {
      return state;
    }
  }
};
