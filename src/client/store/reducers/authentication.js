import { isAuthenticated } from "../../sevices/auth";

let isLoggedIn = isAuthenticated() ? true : false;

const INITIAL_STATE = {
  isLoggedIn: isLoggedIn,
};

export default function authentication(state = INITIAL_STATE, action) {
  if (action.type === "LOGIN") {
    return {
      isLoggedIn: true,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      isLoggedIn: false,
    };
  }

  return state;
}
