import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

function Menu({ children, ...props }) {
  return (
    <Tippy offset={[0, 14]} {...props}>
      {children}
    </Tippy>
  );
}

export default Menu;
