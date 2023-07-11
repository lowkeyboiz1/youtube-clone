export const subscribeStatus = (bol) => {
    return {
      type: "subscribe",
      payload: bol,
    };
  };
