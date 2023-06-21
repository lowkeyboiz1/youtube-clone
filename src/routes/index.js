import Home from "../pages/Home";
import RegisterChanel from "../pages/RegisterChanel";
import Search from "../pages/Search";
import Shorts from "../pages/Shorts";
import Library from "../pages/Library";
import Watch from "../components/Watch";
import HeaderOnly from "../layouts/HeaderOnly";
import Channels from "../pages/Channels";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Shorts", component: Shorts },
  { path: "/RegisterChanel", component: RegisterChanel },
  { path: "/Library", component: Library },
  { path: "/Shorts", component: Shorts },
  { path: "/Channels", component: Channels },
  { path: "/Search/:key", component: Search},
  { path: "/Watch/:id", component: Watch, layout: HeaderOnly },
];

// private routes
const privateRoutes = [];

export { privateRoutes, publicRoutes };
