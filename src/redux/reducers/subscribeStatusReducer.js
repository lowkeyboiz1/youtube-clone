
export const subscribeStatusReducer = (state = false, action) => {
  switch (action.type) {
    case 'listSeen':
      return action.payload
    default:
      return state
  }
}

export default subscribeStatusReducer
