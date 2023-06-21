import { Link } from "react-router-dom";

function Button({ to, href, children, disable = false, ...passProps }) {
  let Comp = "button";
  const props = {
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  //Remove event listener when btn is disable
  if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }
  return <Comp {...props}>{children}</Comp>;
}

export default Button;
