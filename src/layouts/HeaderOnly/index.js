import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import { toggle } from '../../redux/actions/toggle'
import MenuHeader from '../../components/MenuHeader'
import Sidenav from '../../components/Sidebar/Sidenav'
import ItemSideBar from '../../components/Sidebar/ItemSideBar'
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
import styles from './HeaderOnly.module.scss'
import classNames from 'classnames/bind'
import Sidebar from '../../components/Sidebar'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { listSeen } from '../../redux/actions/listSeen'
import Tippy from '@tippyjs/react'
import Button from '../../components/Button'
import SettingsIcon from '@mui/icons-material/Settings'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FlagIcon from '@mui/icons-material/Flag'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import HelpIcon from '@mui/icons-material/Help'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
import FeedbackIcon from '@mui/icons-material/Feedback'

const cx = classNames.bind(styles)

function HeaderOnly({ children }) {
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

  const handleGetListSeen = (listSeenOfUser) => {
    //truyen data
    dispatch(listSeen(listSeenOfUser))
  }

  useEffect(() => {
    const listSeenOfUser = localStorage.getItem('listSeen')
    handleGetListSeen(JSON.parse(listSeenOfUser))
  }, [loggedInUser])

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
    <div className=''>
      <div className='hidden md:block '>
        <Header />
      </div>
      <div className=''>
        <div
          className={`${
            toggleMenu && 'fixed flex top-0 bottom-0 left-0 right-0 z-[2000]'
          }`}
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
                    activeIcon={
                      <HomeIconActive className='h-[24px] w-[24px] mr-[24px]' />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title='Shorts'
                    icon={<ShortIcon className='h-[24px] w-[24px] mr-[24px]' />}
                    to={'/Shorts'}
                    activeIcon={
                      <ShortIconActive className='h-[24px] w-[24px] mr-[24px]' />
                    }
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
                      noActive={false}
                      title='Video đã xem'
                      icon={<VideoViewedIcon className='h-[24px] w-[24px] mr-[24px]' />}
                      to={'/Library'}
                      activeIcon={
                        <VideoViewedIconActive className='h-[24px] w-[24px] mr-[24px]' />
                      }
                    ></ItemSideBar>
                    <ItemSideBar
                      onclick={() => handleToggleMenu()}
                      title='Xem sau'
                      noActive={false}
                      icon={<SeeLaterIcon className='h-[24px] w-[24px] mr-[24px]' />}
                      to={'/'}
                      activeIcon={
                        <SeeLaterActive className='h-[24px] w-[24px] mr-[24px]' />
                      }
                    ></ItemSideBar>

                    <ItemSideBar
                      onclick={() => handleToggleMenu()}
                      title='Video đã thích'
                      icon={<LikeSideBarIcon className='h-[24px] w-[24px] mr-[24px]' />}
                      to={'/RegisterChanel'}
                      activeIcon={
                        <LikeSideBarActive className='h-[24px] w-[24px] mr-[24px]' />
                      }
                    ></ItemSideBar>
                  </div>
                </Sidenav>
              </div>
              {channleSubscribe && channleSubscribe.length > 0 && (
                <div className='py-2 border-t-[1px] border-[#ffffff33] mt-3'>
                  {loggedInUser ? (
                    <>
                      <div className='text-[16px] font-medium px-4 py-1'>
                        Kênh đăng ký
                      </div>
                      {channleSubscribe && channleSubscribe.length > 0 ? (
                        channleSubscribe.map(
                          (item, index) =>
                            index < numberMore && (
                              <Tippy
                                key={index}
                                content={item.itemChannle.channelTitle}
                                delay={500}
                                arrow={false}
                              >
                                <div
                                  onClick={() =>
                                    navigateToChannleDetail(item.itemChannle.channelId)
                                  }
                                  className='channle-sub flex px-4 py-2 hover:rounded-[12px] hover:bg-[#272727] cursor-pointer'
                                >
                                  <div className='h-[24px] w-[24px] rounded-full overflow-hidden mr-6 flex-shrink-0'>
                                    <img
                                      className='object-cover h-full w-full'
                                      src={item.itemChannle.urlChannel}
                                      alt=''
                                    />
                                  </div>
                                  <div className='title-channle ml-[-4px] overflow-hidden line-clamp-1 max-w-[120px] text-[14px]'>
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
              )}
              <div className='border-y-[1px] border-[#ffffff33] py-3'>
                <div className='text-[16px] font-medium p-1 px-4'>Khám phá</div>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='Thịnh hành'
                  icon={
                    <svg
                      enableBackground='new 0 0 24 24'
                      viewBox='0 0 24 24'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                    >
                      <path d='M19 3.87v9.77C19 17.7 15.86 21 12 21s-7-3.3-7-7.37v-.13c0-1.06.22-2.13.62-3.09.5-1.19 1.29-2.21 2.27-2.97.85-.66 1.83-1.14 2.87-1.65.39-.19.77-.38 1.15-.58.36-.19.72-.38 1.08-.56v3.22l1.55-1.04L19 3.87M20 2l-6 4V3c-.85.44-1.7.88-2.55 1.33-1.41.74-2.9 1.34-4.17 2.32-1.13.87-2.02 2.05-2.58 3.37-.46 1.09-.7 2.29-.7 3.48v.14C4 18.26 7.58 22 12 22s8-3.74 8-8.36V2zM9.45 12.89 14 10v5.7c0 1.82-1.34 3.3-3 3.3s-3-1.47-3-3.3c0-1.19.58-2.23 1.45-2.81z'></path>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='Âm nhạc'
                  icon={
                    <svg
                      enableBackground='new 0 0 24 24'
                      viewBox='0 0 24 24'
                      focusable='false'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                    >
                      <path d='M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v2z'></path>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='Trò chơi'
                  icon={
                    <svg
                      enableBackground='new 0 0 24 24'
                      viewBox='0 0 24 24'
                      focusable='false'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                    >
                      <path d='M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.03-4.35-4.5 2.53-.49.27-.49-.27-4.5-2.53L3 7.39v6.43l8.98 5.04 8.98-5.04V7.39l-3.99-2.24m0-1.15 4.99 2.8v7.6L11.98 20 2 14.4V6.8L6.99 4l4.99 2.8L16.97 4z'></path>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='Tin tức'
                  icon={
                    <svg
                      enableBackground='new 0 0 24 24'
                      viewBox='0 0 24 24'
                      focusable='false'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                    >
                      <path d='M11 11v6H7v-6h4m1-1H6v8h6v-8zM3 3.03V21h14l4-4V3.03M20 4v11.99l-.01.01H16v3.99l-.01.01H4V4h16zm-2 4H6V6h12v2zm0 7h-5v-2h5v2zm0-3h-5v-2h5v2z'></path>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='Thể thao'
                  icon={
                    <svg
                      enableBackground='new 0 0 24 24'
                      viewBox='0 0 24 24'
                      focusable='false'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                    >
                      <path d='M18 5V2H6v3H3v6l3.23 1.61c.7 2.5 2.97 4.34 5.69 4.38L8 19v3h8v-3l-3.92-2.01c2.72-.04 4.99-1.88 5.69-4.38L21 11V5h-3zM6 11.38l-2-1V6h2v5.38zM15 21H9v-1.39l3-1.54 3 1.54V21zm2-10c0 2.76-2.24 5-5 5s-5-2.24-5-5V3h10v8zm3-.62-2 1V6h2v4.38z'></path>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
              </div>
              <div className='py-2 border-b-[1px] border-[#ffffff33]'>
                <div className='text-[15px] font-medium px-4 py-1'>
                  Dịch vụ khác của YouTube
                </div>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='YouTube Premium'
                  icon={
                    <svg
                      viewBox='0 0 24 24'
                      focusable='false'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                    >
                      <defs>
                        <radialGradient
                          cx='5.4%'
                          cy='7.11%'
                          r='107.93%'
                          fx='5.4%'
                          fy='7.11%'
                          gradientTransform='matrix(.70653 0 0 1 .016 0)'
                        >
                          <stop offset='0%' stopColor='#FFF'></stop>
                          <stop offset='100%' stopColor='#FFF' stopOpacity='0'></stop>
                        </radialGradient>
                      </defs>
                      <g fill='none' fillRule='evenodd'>
                        <path d='M1 1h21.77v22H1z'></path>
                        <g fillRule='nonzero'>
                          <path
                            fill='#F00'
                            d='M22.54 7.6s-.2-1.5-.86-2.17c-.83-.87-1.75-.88-2.18-.93-3.04-.22-7.6-.2-7.6-.2s-4.56-.02-7.6.2c-.43.05-1.35.06-2.18.93-.65.67-.86 2.18-.86 2.18S1.04 9.4 1 11.18v1.66c.04 1.78.26 3.55.26 3.55s.2 1.5.86 2.18c.83.87 1.9.84 2.4.94 1.7.15 7.2.2 7.38.2 0 0 4.57 0 7.6-.22.43-.05 1.35-.06 2.18-.93.65-.67.86-2.18.86-2.18s.22-1.77.24-3.55v-1.66c-.02-1.78-.24-3.55-.24-3.55z'
                          ></path>
                          <path fill='#FAFAFA' d='M9.68 8.9v6.18l5.84-3.1'></path>
                          <path
                            fill='#000'
                            fillOpacity='.12'
                            d='M9.68 8.88l5.13 3.48.73-.38'
                          ></path>
                          <path
                            fill='#FFF'
                            fillOpacity='.2'
                            d='M22.54 7.6s-.2-1.5-.86-2.17c-.83-.87-1.75-.88-2.18-.93-3.04-.22-7.6-.2-7.6-.2s-4.56-.02-7.6.2c-.43.05-1.35.06-2.18.93-.65.67-.86 2.18-.86 2.18S1.04 9.4 1 11.18v.1c.04-1.76.26-3.54.26-3.54s.2-1.5.86-2.17c.83-.88 1.75-.88 2.18-.93 3.04-.22 7.6-.2 7.6-.2s4.56-.02 7.6.2c.43.05 1.35.05 2.18.93.65.66.86 2.17.86 2.17s.22 1.78.23 3.55v-.1c0-1.8-.23-3.56-.23-3.56z'
                          ></path>
                          <path
                            fill='#3E2723'
                            fillOpacity='.2'
                            d='M22.54 16.4s-.2 1.5-.86 2.17c-.83.87-1.75.88-2.18.93-3.04.22-7.6.2-7.6.2s-4.56.02-7.6-.2c-.43-.05-1.35-.06-2.18-.93-.65-.67-.86-2.18-.86-2.18s-.22-1.8-.26-3.57v-.1c.04 1.76.26 3.54.26 3.54s.2 1.5.86 2.17c.83.88 1.75.88 2.18.93 3.04.22 7.6.2 7.6.2s4.56.02 7.6-.2c.43-.05 1.35-.05 2.18-.93.65-.66.86-2.17.86-2.17s.22-1.78.23-3.55v.1c0 1.8-.23 3.56-.23 3.56z'
                          ></path>
                          <path
                            fill='#FFF'
                            fillOpacity='.2'
                            d='M9.68 15.08v.1l5.84-3.08v-.12'
                          ></path>
                          <path
                            fill='#3E2723'
                            fillOpacity='.2'
                            d='M9.68 8.9v-.13l5.84 3.1v.1'
                          ></path>
                          <path
                            fill='url(#a)'
                            fillOpacity='.1'
                            d='M21.54 3.4s-.2-1.5-.86-2.18C19.85.35 18.93.35 18.5.3 15.46.07 10.9.1 10.9.1S6.34.07 3.3.3c-.43.05-1.35.05-2.18.92C.47 1.9.26 3.4.26 3.4S.04 5.17 0 6.95V8.6c.04 1.8.26 3.56.26 3.56s.2 1.52.86 2.18c.83.87 1.9.85 2.4.94 1.7.16 7.2.2 7.38.2 0 0 4.57 0 7.6-.2.43-.06 1.35-.07 2.18-.94.65-.66.86-2.18.86-2.18s.22-1.77.24-3.55V6.97c-.02-1.78-.24-3.55-.24-3.55z'
                            transform='translate(1 4.208)'
                          ></path>
                        </g>
                      </g>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='YouTube Music'
                  icon={
                    <svg
                      viewBox='0 0 24 24'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                      focusable='false'
                    >
                      <circle fill='#FF0000' cx='12' cy='12' r='10'></circle>
                      <polygon fill='#FFFFFF' points='10,14.65 10,9.35 15,12 '></polygon>
                      <path
                        fill='#FFFFFF'
                        d='M12,7c2.76,0,5,2.24,5,5s-2.24,5-5,5s-5-2.24-5-5S9.24,7,12,7 M12,6c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6 S15.31,6,12,6L12,6z'
                      ></path>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  noActive={false}
                  title='YouTube Kids'
                  icon={
                    <svg
                      viewBox='0 0 24 24'
                      focusable='false'
                      className='h-[24px] w-[24px] mr-[24px]'
                      fill='currentColor'
                    >
                      <path
                        fill='#FF0000'
                        d='M21.39,13.19c0-0.08,0-0.15,0-0.22c-0.01-0.86-0.5-5-0.78-5.74c-0.32-0.85-0.76-1.5-1.31-1.91 c-0.9-0.67-1.66-0.82-2.6-0.84l-0.02,0c-0.4,0-3.01,0.32-5.2,0.62C9.28,5.4,6.53,5.8,5.88,6.04c-0.9,0.33-1.62,0.77-2.19,1.33 c-1.05,1.04-1.18,2.11-1.04,3.51c0.1,1.09,0.69,5.37,1.02,6.35c0.45,1.32,1.33,2.12,2.47,2.24c0.28,0.03,0.55,0.05,0.82,0.05 c1,0,1.8-0.21,2.72-0.46c1.45-0.39,3.25-0.87,6.97-0.87l0.09,0h0.02c0.91,0,3.14-0.2,4.16-2.07C21.44,15.12,21.41,13.91,21.39,13.19 z'
                      ></path>
                      <path
                        fill='#000'
                        d='M21.99,13.26c0-0.08,0-0.16-0.01-0.24c-0.01-0.92-0.54-5.32-0.83-6.11c-0.34-0.91-0.81-1.59-1.4-2.03 C18.81,4.17,17.99,4.02,17,4l-0.02,0c-0.43,0-3.21,0.34-5.54,0.66c-2.33,0.32-5.25,0.75-5.95,1C4.53,6.01,3.76,6.48,3.16,7.08 c-1.12,1.1-1.25,2.25-1.11,3.74c0.11,1.16,0.73,5.71,1.08,6.75c0.48,1.41,1.41,2.25,2.63,2.38C6.06,19.98,6.34,20,6.63,20 c1.07,0,1.91-0.23,2.89-0.49c1.54-0.41,3.46-0.93,7.41-0.93l0.1,0h0.02c0.97,0,3.34-0.21,4.42-2.2 C22.04,15.32,22.01,14.03,21.99,13.26z M20.59,15.91c-0.82,1.51-2.75,1.68-3.56,1.68l-0.1,0c-4.09,0-6.07,0.53-7.67,0.96 C8.31,18.8,7.56,19,6.63,19c-0.25,0-0.5-0.01-0.76-0.04c-1.04-0.11-1.54-0.99-1.79-1.71c-0.3-0.88-0.91-5.21-1.04-6.53 C2.9,9.25,3.1,8.54,3.86,7.79c0.5-0.5,1.15-0.89,1.97-1.19c0.17-0.06,1.1-0.32,5.74-0.95C14.2,5.29,16.64,5.01,16.99,5 c0.83,0.02,1.43,0.13,2.17,0.69c0.43,0.32,0.79,0.86,1.06,1.58c0.22,0.58,0.76,4.78,0.77,5.77l0.01,0.25 C21.01,13.96,21.04,15.08,20.59,15.91z'
                      ></path>
                      <path
                        fill='#000'
                        d='M11.59,14.76c-0.48,0.36-0.8,0.45-1.01,0.45c-0.16,0-0.25-0.05-0.3-0.08c-0.34-0.18-0.42-0.61-0.5-1.2l-0.01-0.1 c-0.04-0.31-0.26-2.1-0.38-3.16L9.3,9.94C9.26,9.66,9.2,9.19,9.54,8.94c0.32-0.23,0.75-0.09,0.96-0.03c0.53,0.17,3.6,1.23,4.59,1.73 c0.21,0.09,0.67,0.28,0.68,0.83c0.01,0.5-0.38,0.74-0.53,0.82L11.59,14.76z'
                      ></path>
                      <path
                        fill='#FFF'
                        d='M10.3,9.89c0,0,0.5,4.08,0.51,4.19c0.06-0.04,3.79-2.58,3.79-2.58C13.71,11.07,11.07,10.14,10.3,9.89z'
                      ></path>
                    </svg>
                  }
                  to={'/'}
                ></ItemSideBar>
              </div>
              <div
              className='pt-2 mb-[50px]'
            >
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
        <div className=''> {children}</div>
      </div>
    </div>
  )
}

export default HeaderOnly
