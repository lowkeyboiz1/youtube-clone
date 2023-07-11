const initState = []

export const listSeenReducer = (state = initState, action) => {
  switch (action.type) {
    case 'likeVideo':
      return action.payload
    default:
      return state
  }
}

export default listSeenReducer
