import {
  HomeIcon,
  HomeIconActive,
  LibraryIcon,
  LibraryIconActive,
  LikeSideBarActive,
  LikeSideBarIcon,
  RegisterChanelIcon,
  RegisterChanelIconActive,
  SeeLaterActive,
  SeeLaterIcon,
  ShortIcon,
  ShortIconActive,
  VideoViewedIcon,
  VideoViewedIconActive,
} from '../../assets/Icon'
import ItemNav from './ItemNav'
import Sidenav from './Sidenav'
import MenuHeader from '../MenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../redux/actions/toggle'
import ItemSideBar from './ItemSideBar'
import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import SettingsIcon from '@mui/icons-material/Settings'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FlagIcon from '@mui/icons-material/Flag'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import HelpIcon from '@mui/icons-material/Help'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
import FeedbackIcon from '@mui/icons-material/Feedback'
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'

const cx = classNames.bind(styles)

function Sidebar() {
  const [count, setCount] = useState(
    !!JSON.parse(localStorage.getItem('selectSidebar'))
      ? JSON.parse(localStorage.getItem('selectSidebar'))
      : 0,
  )

  const [showMore, setShowMore] = useState(true)
  const [numberMore, setNumberMore] = useState(3)
  const toggleMenu = useSelector((state) => state.toggleSidebarReducer)
  const dispatch = useDispatch()
  const [channleSubscribe, setChannleSubscribe] = useState([])

  const handleToggleMenu = () => {
    dispatch(toggle(toggleMenu))
  }

  const handleShow = () => {
    setShowMore(!showMore)
    setNumberMore(showMore ? 8 : 3)
  }

  const sidenavData = [
    {
      title: 'Trang chủ',
      icon: <HomeIcon className='h-[24px] w-[24px]' />,
      to: '/',
      activeIcon: <HomeIconActive className='h-[24px] w-[24px]' />,
    },

    {
      title: 'Shorts',
      icon: <ShortIcon className='h-[24px] w-[24px]' />,
      to: '/Shorts',
      activeIcon: <ShortIconActive className='h-[24px] w-[24px]' />,
    },
    {
      title: 'Kênh đăng ký',
      icon: <RegisterChanelIcon className='h-[24px] w-[24px]' />,
      to: '/RegisterChanel',
      activeIcon: <RegisterChanelIconActive className='h-[24px] w-[24px]' />,
    },
    {
      title: 'Thư viện',
      icon: <LibraryIcon className='h-[24px] w-[24px]' />,
      to: '/Library',
      activeIcon: <LibraryIconActive className='h-[24px] w-[24px]' />,
    },
  ]
  const handleActive = (index) => {
    localStorage.setItem('selectSidebar', JSON.stringify(index))
    const itemActive = localStorage.getItem('selectSidebar')
    if (itemActive) {
      setCount(JSON.parse(localStorage.getItem('selectSidebar')))
    }
  }
  const url = window.location.href

  useEffect(() => {
    const itemActive = JSON.parse(localStorage.getItem('selectSidebar'))
    if (itemActive !== null) {
      setCount(itemActive)
    } else {
      setCount(0)
    }
  }, [url])

  const [loggedInUser] = useAuthState(auth)
  const getDataChannlesFormDB = async () => {
    const result = await axios.post('http://localhost:4000/user/subscribeChannles', {
      uid: loggedInUser?.uid,
    })

    setChannleSubscribe(result.data.currentUserSubscribeChannles)
    console.log(result.data.currentUserSubscribeChannles)
  }

  useEffect(() => {
    getDataChannlesFormDB()
  }, [loggedInUser])

  return (
    <>
      <div className='sidebar fixed bg-black bottom-0 top-[56px] hidden md:block'>
        <aside className='w-[64px] ml-1 text-white mt-[2px]'>
          <Sidenav>
            {sidenavData.map((item, index) => (
              <div className='' key={index} onClick={() => handleActive(index)}>
                <ItemNav
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                  activeIcon={item.activeIcon}
                  active={index === count}
                ></ItemNav>
              </div>
            ))}
          </Sidenav>
        </aside>
      </div>
      <div
        className={`${toggleMenu && 'fixed flex top-0 bottom-0 left-0 right-0 z-[2000]'}`}
      >
        <div
          className={`fixed top-0 bottom-0 bg-black w-[240px] ease-in duration-300 z-20 ${
            toggleMenu ? 'translate-x-0' : '-translate-x-[240px]'
          }`}
        >
          <MenuHeader className='p-2 ml-2' />
          <div className={cx('sidebarbig', 'p-2 overflow-auto h-full')}>
            <div className='page'>
              <Sidenav>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title='Trang chủ'
                  icon={<HomeIcon className='h-[24px] w-[24px] mr-[24px]' />}
                  to={'/'}
                  activeIcon={<HomeIconActive className='h-[24px] w-[24px] mr-[24px]' />}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title='Shorts'
                  icon={<ShortIcon className='h-[24px] w-[24px] mr-[24px]' />}
                  to={'/Shorts'}
                  activeIcon={<ShortIconActive className='h-[24px] w-[24px] mr-[24px]' />}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title='Kênh đăng ký'
                  icon={<RegisterChanelIcon className='h-[24px] w-[24px] mr-[24px]' />}
                  to={'/RegisterChanel'}
                  activeIcon={
                    <RegisterChanelIconActive className='h-[24px] w-[24px] mr-[24px]' />
                  }
                ></ItemSideBar>
                <div className='saved border-t-[1px] border-[#ffffff33] mt-3 py-3'>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title='Thư viện'
                    icon={<LibraryIcon className='h-[24px] w-[24px] mr-[24px]' />}
                    to={'/Library'}
                    activeIcon={
                      <LibraryIconActive className='h-[24px] w-[24px] mr-[24px]' />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title='Video đã xem'
                    icon={<VideoViewedIcon className='h-[24px] w-[24px] mr-[24px]' />}
                    to={'/Library'}
                    noActive={false}
                    activeIcon={
                      <VideoViewedIconActive className='h-[24px] w-[24px] mr-[24px]' />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title='Xem sau'
                    icon={<SeeLaterIcon className='h-[24px] w-[24px] mr-[24px]' />}
                    to={'/'}
                    noActive={false}
                    activeIcon={
                      <SeeLaterActive className='h-[24px] w-[24px] mr-[24px]' />
                    }
                  ></ItemSideBar>

                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title='Video đã thích'
                    icon={<LikeSideBarIcon className='h-[24px] w-[24px] mr-[24px]' />}
                    to={'/Liked'}
                    noActive={true}
                    activeIcon={
                      <LikeSideBarActive className='h-[24px] w-[24px] mr-[24px]' />
                    }
                  ></ItemSideBar>
                </div>
              </Sidenav>
            </div>
            <div className='p-2 border-y-[1px] border-[#ffffff33] mt-3 py-3'>
              <div className='text-[17px] font-medium px-2 py-1'>Kênh đăng ký</div>
              {channleSubscribe && channleSubscribe.length > 0 ? (
                channleSubscribe.map(
                  (item, index) =>
                    index < numberMore && (
                      <Tippy
                        key={index}
                        content='TrungQuanDev - Một lập trình viên'
                        delay={500}
                        arrow={false}
                      >
                        <div
                          onClick={() => handleToggleMenu()}
                          className='channle-sub flex px-2 py-2 hover:rounded-[12px] hover:bg-[#272727] cursor-pointer'
                        >
                          <div className='h-[24px] w-[24px] rounded-full overflow-hidden mr-6 flex-shrink-0'>
                            <img
                              className='object-cover h-full w-full'
                              src='https://yt3.ggpht.com/I03MHEm1p42pjhZr7qLLvtJsCcfZym028iYU5mRi8FO5RxNZYGNoH_XMebmbPE41RUJW7KX70A=s88-c-k-c0x00ffffff-no-rj'
                              alt=''
                            />
                          </div>
                          <div className='title-channle overflow-hidden line-clamp-1 max-w-[120px] text-[14px]'>
                            TrungQuanDev - Một lập trình viên
                          </div>
                        </div>
                      </Tippy>
                    ),
                )
              ) : (
                <div className='channle-sub flex px-2 py-2 cursor-pointer items-center'>
                  <div className='h-[24px] w-[24px] rounded-full overflow-hidden mr-6 flex-shrink-0'>
                    <div className='object-cover h-full w-full bg-[#fff3] animate-pulse' />
                  </div>
                  <div className='title-channle bg-[#fff3] animate-pulse overflow-hidden line-clamp-1 h-[14px] w-[120px] text-[14px]'></div>
                </div>
              )}

              <div
                className={channleSubscribe?.length > 3 ? '' : 'hidden'}
                onClick={handleShow}
              >
                {showMore ? (
                  <div className='show-more flex px-2 py-2 hover:rounded-[12px] hover:bg-[#272727] cursor-pointer'>
                    <div className='mr-6'>
                      <svg
                        height='24'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        width='24'
                        focusable='false'
                      >
                        <path d='m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z'></path>
                      </svg>
                    </div>
                    <div className=''>Hiển thị thêm</div>
                  </div>
                ) : (
                  <div className='show-more flex px-2 py-2 hover:rounded-[12px] hover:bg-[#272727] cursor-pointer'>
                    <div className='mr-6 rotate-180'>
                      <svg
                        height='24'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        width='24'
                        focusable='false'
                      >
                        <path d='m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z'></path>
                      </svg>
                    </div>
                    <div className=''>Ẩn bớt</div>
                  </div>
                )}
              </div>
            </div>
            <div className='p-2 mb-[50px]'>
              <ItemSideBar
                onclick={() => handleToggleMenu()}
                noActive={false}
                title='Cài đặt'
                icon={<SettingsOutlinedIcon className='h-[24px] w-[24px] mr-[24px]' />}
                to={'/'}
                activeIcon={<SettingsIcon className='h-[24px] w-[24px] mr-[24px]' />}
              ></ItemSideBar>
              <ItemSideBar
                onclick={() => handleToggleMenu()}
                noActive={false}
                title='Nhật ký báo cáo'
                icon={<FlagOutlinedIcon className='h-[24px] w-[24px] mr-[24px]' />}
                to={'/'}
                activeIcon={<FlagIcon className='h-[24px] w-[24px] mr-[24px]' />}
              ></ItemSideBar>
              <ItemSideBar
                onclick={() => handleToggleMenu()}
                noActive={false}
                title='Trợ giúp'
                icon={<HelpOutlineOutlinedIcon className='h-[24px] w-[24px] mr-[24px]' />}
                to={'/'}
                activeIcon={<HelpIcon className='h-[24px] w-[24px] mr-[24px]' />}
              ></ItemSideBar>
              <ItemSideBar
                onclick={() => handleToggleMenu()}
                noActive={false}
                title='Gửi ý kiến phản hồi'
                icon={<FeedbackOutlinedIcon className='h-[24px] w-[24px] mr-[24px]' />}
                to={'/'}
                activeIcon={<FeedbackIcon className='h-[24px] w-[24px] mr-[24px]' />}
              ></ItemSideBar>
            </div>
          </div>
        </div>
        {toggleMenu && (
          <div
            className='overlay bg-black/50 flex-1'
            onClick={() => handleToggleMenu()}
          ></div>
        )}
      </div>
    </>
  )
}

export default Sidebar
