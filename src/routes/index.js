import Home from '../pages/Home'
import RegisterChanel from '../pages/RegisterChanel'
import Search from '../pages/Search'
import Shorts from '../pages/Shorts'
import Library from '../pages/Library'
import Watch from '../components/Watch'
import HeaderOnly from '../layouts/HeaderOnly'
import Channels from '../pages/Channels'
import DetailChannle from '../pages/DetailChannle'
import Liked from '../pages/Liked'
import SeeLater from '../pages/SeeLater'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/Shorts', component: Shorts },
  { path: '/RegisterChanel', component: RegisterChanel },
  { path: '/Library', component: Library },
  { path: '/Shorts', component: Shorts },
  { path: '/Channels', component: Channels },
  { path: '/Liked', component: Liked },
  { path: '/SeeLater', component: SeeLater },
  { path: '/Search/:key', component: Search },
  { path: '/DetailChannle/:id', component: DetailChannle },
  { path: '/Watch/:id', component: Watch, layout: HeaderOnly },
]

// private routes
const privateRoutes = []

export { privateRoutes, publicRoutes }
