export const toggleSidebarReducer = (state = false, action) => {
  switch (action.type) {
    case "toggle":
      return !action.payload;
    default:
      return state;
  }
};

export default toggleSidebarReducer;
