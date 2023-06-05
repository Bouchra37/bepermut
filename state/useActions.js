
export const setLoggedUserId = (userId) => {
    return {
      type: 'SET_LOGGED_USER_ID',
      payload: userId,
    };
  };