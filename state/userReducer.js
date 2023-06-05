const initialState = {
    loggedUserId: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGGED_USER_ID':
        return {
          ...state,
          loggedUserId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  