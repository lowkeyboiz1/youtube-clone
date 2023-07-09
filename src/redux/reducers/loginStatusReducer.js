export const listSeenReducer = (state = false, action) => {
  switch (action.type) {
    case 'loginStatus':
      return action.payload
    default:
      return state
  }
}

export default listSeenReducer
