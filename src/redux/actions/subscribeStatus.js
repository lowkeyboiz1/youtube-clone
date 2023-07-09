export const subscribeStatus = (bol) => {
    return {
      type: "listSeen",
      payload: bol,
    };
  };
