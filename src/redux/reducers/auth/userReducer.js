export const user = (state = { userRole: "admin" }, action) => {
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
    default: {
      return state;
    }
  }
};
