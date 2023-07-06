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
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

function Sidebar() {
  const [count, setCount] = useState(
    !!JSON.parse(localStorage.getItem('selectSidebar'))
      ? JSON.parse(localStorage.getItem('selectSidebar'))
      : 0,
  )

  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const [loggedInUser] = useAuthState(auth)

  const [showMore, setShowMore] = useState(true)
  const [numberMore, setNumberMore] = useState(3)
  const toggleMenu = useSelector((state) => state.toggleSidebarReducer)
  const dispatch = useDispatch()
  const [channleSubscribe, setChannleSubscribe] = useState([])

  const handleLogin = () => {
    signInWithGoogle()
  }

  const handleToggleMenu = () => {
    dispatch(toggle(toggleMenu))
  }

  const navigate = useNavigate()
  const navigateToChannleDetail = (channleId) => {
    handleToggleMenu()
    navigate(`/DetailChannle/${channleId}`)
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

  const getChannleSubscribe = async (uid) => {
    const result = await axios.get(`http://localhost:4000/user/subscriptions/${uid}`)
    setChannleSubscribe(result.data.subscriptions)
  }

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      getChannleSubscribe(localUserInfo.uid)
    }
  }, [channleSubscribe])

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
              {loggedInUser ? (
                <>
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
                              onClick={() =>
                                navigateToChannleDetail(item.itemChannle.channelId)
                              }
                              className='channle-sub flex px-2 py-2 hover:rounded-[12px] hover:bg-[#272727] cursor-pointer'
                            >
                              <div className='h-[24px] w-[24px] rounded-full overflow-hidden mr-6 flex-shrink-0'>
                                <img
                                  className='object-cover h-full w-full'
                                  src={item.itemChannle.urlChannel}
                                  alt=''
                                />
                              </div>
                              <div className='title-channle overflow-hidden line-clamp-1 max-w-[120px] text-[14px]'>
                                {item.itemChannle.channelTitle}
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
                </>
              ) : (
                <div className='flex flex-col justify-center items-center'>
                  <div className='text-[14px] text-center mb-3'>
                    Hãy đăng nhập để thích video, bình luận và đăng ký kênh.
                  </div>
                  <div className='btn-login' onClick={handleLogin}>
                    <Button className='flex items-center justify-center border-[1px] border-[#3f3f3f] rounded-full px-3 py-1 hover:bg-[#1a2737] cursor-pointer'>
                      <div className='icon-login'>
                        <svg
                          viewBox='0 0 24 24'
                          preserveAspectRatio='xMidYMid meet'
                          focusable='false'
                          fill='currentColor'
                          className='h-[24px] w-[24px] text-[#3ea6ff] mr-[6px]'
                        >
                          <g>
                            <path d='M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,3c4.96,0,9,4.04,9,9 c0,1.42-0.34,2.76-0.93,3.96c-1.53-1.72-3.98-2.89-7.38-3.03C14.57,12.6,16,10.97,16,9c0-2.21-1.79-4-4-4C9.79,5,8,6.79,8,9 c0,1.97,1.43,3.6,3.31,3.93c-3.4,0.14-5.85,1.31-7.38,3.03C3.34,14.76,3,13.42,3,12C3,7.04,7.04,3,12,3z M9,9c0-1.65,1.35-3,3-3 s3,1.35,3,3c0,1.65-1.35,3-3,3S9,10.65,9,9z M12,21c-3.16,0-5.94-1.64-7.55-4.12C6.01,14.93,8.61,13.9,12,13.9 c3.39,0,5.99,1.03,7.55,2.98C17.94,19.36,15.16,21,12,21z'></path>
                          </g>
                        </svg>
                      </div>
                      <span className='text-[#3ea6ff] text-[14px] font-medium'>
                        Đăng nhập
                      </span>
                    </Button>
                  </div>
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
