
export const subscribeStatusReducer = (state = false, action) => {
  switch (action.type) {
    case 'subscribe':
      return action.payload
    default:
      return state
  }
}

export default subscribeStatusReducer
