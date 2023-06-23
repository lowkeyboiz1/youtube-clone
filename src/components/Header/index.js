import { useEffect, useState } from 'react'
import {
  BackIcon,
  Chanle,
  NotificateIcon,
  SearchIcon,
  TreeDotIcon,
  UploadIcon,
  VoiceIcon,
} from '../../assets/Icon'
import Button from '../Button'
import ItemIconHeader from '../ItemIconHeader'
import Search from '../Search'
import Menu from '../Menu'
import 'tippy.js/dist/tippy.css' // optional
import Tippy from '@tippyjs/react/headless'
import MenuHeader from '../MenuHeader'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/firebase'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'

const cx = classNames.bind(styles)

function Header() {
  const [showStartandEnd, setShowStartandEnd] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [openUserControl, setOpenUserControl] = useState(false)
  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const [loggedInUser] = useAuthState(auth)

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', loggedInUser.email),
          {
            email: loggedInUser.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser.photoURL,
          },
          {
            merge: true,
          },
        )
      } catch (error) {
        console.log('save User to DB fail', error)
      }
    }

    if (loggedInUser) {
      setUserInDb()
    }
  }, [loggedInUser])

  const handleToggleInput = () => {
    setShowStartandEnd(!showStartandEnd)
    setShowInput(!showInput)
  }

  const handleLogin = () => {
    signInWithGoogle()
  }
  const handleLogout = async () => {
    try {
      handleClose()
      await signOut(auth)
    } catch (error) {
      console.log('logout error', error)
    }
  }

  const handleOpen = () => {
    setOpenUserControl(true)
  }
  const handleClose = () => {
    setOpenUserControl(false)
  }
  return (
    <header
      className={`flex justify-between h-[56px] md:pl-4 md:px-4 bg-black items-center fixed w-full z-10 ${
        loggedInUser ? 'md:pr-6' : 'md:pr-1'
      }`}
    >
      {showStartandEnd && <MenuHeader />}
      {showInput && (
        <div onClick={handleToggleInput}>
          <ItemIconHeader className='bg-black border-0'>
            <BackIcon className='h-[24px] w-[24px] text-white' />
          </ItemIconHeader>
        </div>
      )}
      <div
        className={`center flex items-center gap-2 ml-6 justify-end max-w-[580px] flex-1 ${
          loggedInUser ? 'lg:ml-[150px]' : 'lg:ml-[120px]'
        }`}
      >
        <Search
          blur={() => {
            setShowInput(false)
            setShowStartandEnd(true)
          }}
          className={`${showInput ? '!flex' : ''}`}
        />
        {showStartandEnd && (
          <div className='search-icon-menu md:hidden' onClick={handleToggleInput}>
            <ItemIconHeader className='bg-black border-0'>
              <SearchIcon className='h-[24px] w-[24px] text-white' />
            </ItemIconHeader>
          </div>
        )}
        <Menu content='Tìm kiếm bằng giọng nói'>
          <div className='h-[40px] w-[40px] bg-[#161616] rounded-none md:rounded-full'>
            <ItemIconHeader className='rounded-none'>
              <VoiceIcon className='h-[24px] w-[24px] text-white' />
            </ItemIconHeader>
          </div>
        </Menu>
      </div>
      <div className='center2'></div>
      {loggedInUser ? (
        <div
          className={`end gap-2 items-center flex ${
            showStartandEnd ? 'flex z-[300]' : 'hidden z-[300]'
          }`}
        >
          <Menu content='Tạo'>
            <div className='upload hidden md:block'>
              <ItemIconHeader className='bg-black border-0'>
                <UploadIcon className='h-[24px] w-[24px] text-white' />
              </ItemIconHeader>
            </div>
          </Menu>
          <Menu content='Thông báo'>
            <div className='notication'>
              <ItemIconHeader className='bg-black border-0'>
                <NotificateIcon className='h-[24px] w-[24px] text-white' />
              </ItemIconHeader>
            </div>
          </Menu>
          <Tippy
            interactive
            visible={openUserControl}
            onClickOutside={() => handleClose()}
            offset={[0, 16]}
            placement='left'
            render={(attrs) => (
              <div
                className='bg-[#282828] rounded-[10px] text-[#f1f1f1] min-w-[300px] mt-2'
                tabIndex='-1'
                {...attrs}
              >
                <header className='flex border-b-[1px] border-[#fff3] p-[16px] text-[16px]'>
                  <div className='user'>
                    <img
                      className='h-[40px] w-[40px] mr-[12px] rounded-full cursor-pointer'
                      src={loggedInUser.photoURL}
                      alt=''
                    />
                  </div>
                  <div className='info'>
                    <div className='fullname'>{loggedInUser.displayName}</div>
                    <div className='nickname'>{loggedInUser.email}</div>
                    <div className='management-account text-[14px] mt-2 text-[#3ea6ff]'>
                      <Link
                        to='https://myaccount.google.com/u/0/?utm_source=YouTubeWeb&tab=rk&utm_medium=act&tab=rk&hl=vi'
                        target='_blank'
                      >
                        Quản lý Tài khoản Google của bạn
                      </Link>
                    </div>
                  </div>
                </header>
                <div className={cx('wrapper-body')}>
                  <div
                    className={cx(
                      'body',
                      'pb-[8px] text-[14px] overflow-y-auto h-[78vh]',
                    )}
                  >
                    <div className='user-control py-[8px] border-b-[1px] border-[#fff3]'>
                      <div className='item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <Chanle />
                        </div>
                        <div className='title ml-[16px]'>Kênh của bạn</div>
                      </div>
                      <div className='item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            enable-background='new 0 0 24 24'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M10 9.35 15 12l-5 2.65ZM12 3a.73.73 0 00-.31.06L4.3 7.28a.79.79 0 00-.3.52v8.4a.79.79 0 00.3.52l7.39 4.22a.83.83 0 00.62 0l7.39-4.22a.79.79 0 00.3-.52V7.8a.79.79 0 00-.3-.52l-7.39-4.22A.73.73 0 0012 3m0-1a1.6 1.6 0 01.8.19l7.4 4.22A1.77 1.77 0 0121 7.8v8.4a1.77 1.77 0 01-.8 1.39l-7.4 4.22a1.78 1.78 0 01-1.6 0l-7.4-4.22A1.77 1.77 0 013 16.2V7.8a1.77 1.77 0 01.8-1.39l7.4-4.22A1.6 1.6 0 0112 2Zm0 4a.42.42 0 00-.17 0l-4.7 2.8a.59.59 0 00-.13.39v5.61a.65.65 0 00.13.37l4.7 2.8A.42.42 0 0012 18a.34.34 0 00.17 0l4.7-2.81a.56.56 0 00.13-.39V9.19a.62.62 0 00-.13-.37L12.17 6A.34.34 0 0012 6m0-1a1.44 1.44 0 01.69.17L17.39 8A1.46 1.46 0 0118 9.19v5.61a1.46 1.46 0 01-.61 1.2l-4.7 2.81A1.44 1.44 0 0112 19a1.4 1.4 0 01-.68-.17L6.62 16A1.47 1.47 0 016 14.8V9.19A1.47 1.47 0 016.62 8l4.7-2.8A1.4 1.4 0 0112 5Z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Youtube Studio</div>
                      </div>
                      <div className='item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M4 20h14v1H3V6h1v14zM6 3v15h15V3H6zm2.02 14c.36-2.13 1.93-4.1 5.48-4.1s5.12 1.97 5.48 4.1H8.02zM11 8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0zm3.21 3.43A3.507 3.507 0 0017 8.5C17 6.57 15.43 5 13.5 5S10 6.57 10 8.5c0 1.69 1.2 3.1 2.79 3.43-3.48.26-5.4 2.42-5.78 5.07H7V4h13v13h-.01c-.38-2.65-2.31-4.81-5.78-5.07z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Chuyển đổi tài khoản</div>
                        <div className='absolute right-8 text-sm'>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                      </div>
                      <div
                        className='item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'
                        onClick={handleLogout}
                      >
                        <div className='icon'>
                          <svg
                            enable-background='new 0 0 24 24'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Đăng xuất</div>
                      </div>
                    </div>
                    <div className='trade-control py-[8px] border-b-[1px] border-[#fff3]'>
                      <div className='item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            enable-background='new 0 0 24 24'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 7V7h-3V5h-2v2h-1c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h4v2H8v2h3v2h2v-2h1c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-4V9h6z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>
                          Giao dịch mua và gói thành viên
                        </div>
                      </div>
                      <div className='item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='m12 3.06 7 3.21v4.84c0 1.3-.25 2.6-.75 3.86-.15.37-.33.76-.55 1.17-.15.27-.31.54-.48.81-1.32 2.01-3.17 3.42-5.23 3.98-2.06-.56-3.91-1.97-5.23-3.98-.17-.27-.33-.54-.48-.81-.22-.41-.4-.79-.55-1.17-.48-1.26-.73-2.56-.73-3.86V6.27l7-3.21m0-1.1L4 5.63v5.49c0 1.47.3 2.9.81 4.22.17.44.37.86.6 1.28.16.3.34.6.52.88 1.42 2.17 3.52 3.82 5.95 4.44l.12.02.12-.03c2.43-.61 4.53-2.26 5.95-4.43.19-.29.36-.58.52-.88.22-.41.43-.84.6-1.28.51-1.33.81-2.76.81-4.23V5.63l-8-3.67zm1.08 10.15c-.32-.06-.64-.11-.96-.12A2.997 2.997 0 0012 6a2.996 2.996 0 00-.12 5.99c-.32.01-.64.06-.96.12C8.64 12.58 7 14.62 7 17h10c0-2.38-1.64-4.42-3.92-4.89zM10 9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm1.12 4.09c.37-.08.64-.11.88-.11s.51.03.88.11c1.48.3 2.63 1.46 3 2.91H8.12c.37-1.45 1.52-2.61 3-2.91z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>
                          Dữ liệu của bạn trong Youtube
                        </div>
                      </div>
                    </div>
                    <div className='system-control py-[8px] border-b-[1px] border-[#fff3]'>
                      <div className='item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <NightlightOutlinedIcon fontSize='medium' />
                        </div>
                        <div className='title ml-[16px]'>Giao diện: Tối</div>
                      </div>
                      <div className='item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            enable-background='new 0 0 24 24'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M13.33 6c-1 2.42-2.22 4.65-3.57 6.52l2.98 2.94-.7.71-2.88-2.84c-.53.67-1.06 1.28-1.61 1.83l-3.19 3.19-.71-.71 3.19-3.19c.55-.55 1.08-1.16 1.6-1.83l-.16-.15c-1.11-1.09-1.97-2.44-2.49-3.9l.94-.34c.47 1.32 1.25 2.54 2.25 3.53l.05.05c1.2-1.68 2.29-3.66 3.2-5.81H2V5h6V3h1v2h7v1h-2.67zM22 21h-1l-1.49-4h-5.02L13 21h-1l4-11h2l4 11zm-2.86-5-1.86-5h-.56l-1.86 5h4.28z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Ngôn ngữ: Tiếng Việt</div>
                      </div>
                      <div className='item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <AdminPanelSettingsOutlinedIcon />
                        </div>
                        <div className='title ml-[16px]'>Chế độ hạn chế: Đã tắt</div>
                        <div className='absolute right-8 text-sm'>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                      </div>
                      <div className='item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <LanguageOutlinedIcon />
                        </div>
                        <div className='title ml-[16px]'>Địa điểm: Việt Nam</div>
                      </div>
                      <div className='item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            height='24'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                          >
                            <path d='M16 16H8v-2h8v2zm0-5h-2v2h2v-2zm3 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-3 0H8v2h2v-2zm-3 0H5v2h2v-2zm9-3h-2v2h2V8zm3 0h-2v2h2V8zm-6 0h-2v2h2V8zm-3 0H8v2h2V8zM7 8H5v2h2V8zm15-3v14H2V5h20zm-1 1H3v12h18V6z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Phím tắt</div>
                      </div>
                    </div>
                    <div className='settings-shortcut-control py-[8px] border-b-[1px] border-[#fff3]'>
                      <div className='item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            enable-background='new 0 0 24 24'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M12 9.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-1c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM13.22 3l.55 2.2.13.51.5.18c.61.23 1.19.56 1.72.98l.4.32.5-.14 2.17-.62 1.22 2.11-1.63 1.59-.37.36.08.51c.05.32.08.64.08.98s-.03.66-.08.98l-.08.51.37.36 1.63 1.59-1.22 2.11-2.17-.62-.5-.14-.4.32c-.53.43-1.11.76-1.72.98l-.5.18-.13.51-.55 2.24h-2.44l-.55-2.2-.13-.51-.5-.18c-.6-.23-1.18-.56-1.72-.99l-.4-.32-.5.14-2.17.62-1.21-2.12 1.63-1.59.37-.36-.08-.51c-.05-.32-.08-.65-.08-.98s.03-.66.08-.98l.08-.51-.37-.36L3.6 8.56l1.22-2.11 2.17.62.5.14.4-.32c.53-.44 1.11-.77 1.72-.99l.5-.18.13-.51.54-2.21h2.44M14 2h-4l-.74 2.96c-.73.27-1.4.66-2 1.14l-2.92-.83-2 3.46 2.19 2.13c-.06.37-.09.75-.09 1.14s.03.77.09 1.14l-2.19 2.13 2 3.46 2.92-.83c.6.48 1.27.87 2 1.14L10 22h4l.74-2.96c.73-.27 1.4-.66 2-1.14l2.92.83 2-3.46-2.19-2.13c.06-.37.09-.75.09-1.14s-.03-.77-.09-1.14l2.19-2.13-2-3.46-2.92.83c-.6-.48-1.27-.87-2-1.14L14 2z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Cài đặt</div>
                      </div>
                    </div>
                    <div className='shortcut-control py-[8px] border-b-[1px] border-[#fff3]'>
                      <div className='item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            enable-background='new 0 0 24 24'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M15.36 9.96c0 1.09-.67 1.67-1.31 2.24-.53.47-1.03.9-1.16 1.6l-.04.2H11.1l.03-.28c.14-1.17.8-1.76 1.47-2.27.52-.4 1.01-.77 1.01-1.49 0-.51-.23-.97-.63-1.29-.4-.31-.92-.42-1.42-.29-.59.15-1.05.67-1.19 1.34l-.05.28H8.57l.06-.42c.2-1.4 1.15-2.53 2.42-2.87 1.05-.29 2.14-.08 2.98.57.85.64 1.33 1.62 1.33 2.68zM12 18c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-15c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Trợ giúp</div>
                      </div>
                      <div className='item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer'>
                        <div className='icon'>
                          <svg
                            enable-background='new 0 0 24 24'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                          >
                            <path d='M13 14h-2v-2h2v2zm0-9h-2v6h2V5zm6-2H5v16.59l3.29-3.29.3-.3H19V3m1-1v15H9l-5 5V2h16z'></path>
                          </svg>
                        </div>
                        <div className='title ml-[16px]'>Gửi ý kiến phản hồi</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <div className='user mr-2 md:mx-3 flex-shrink-0'>
              {loggedInUser ? (
                <img
                  onClick={handleOpen}
                  className={`h-[32px] w-[32px] rounded-full cursor-pointer
                  }`}
                  src={loggedInUser.photoURL}
                  alt=''
                />
              ) : (
                <div
                  className={`h-full w-full object-cover ${
                    !loggedInUser && 'bg-gray-300 animate-pulse'
                  }`}
                  alt=''
                ></div>
              )}
            </div>
          </Tippy>
        </div>
      ) : (
        <div className='end flex justify-center items-center'>
          <Menu content='Cài đặt'>
            <div className={`menu-header p-2 ${loggedInUser ? 'md:mr-[12px]' : 'pr-0'}`}>
              <ItemIconHeader className='bg-black border-0 p-2 md:mr-[6px] '>
                <TreeDotIcon className='h-[24px] w-[24px] text-white cursor-pointer' />
              </ItemIconHeader>
            </div>
          </Menu>
          <div
            className='btn-login border-[1px] border-[#3f3f3f] rounded-full px-3 py-1 hover:bg-[#1a2737] cursor-pointer hidden md:flex'
            onClick={handleLogin}
          >
            <Button className='flex items-center justify-center'>
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
              <span className='text-[#3ea6ff] text-[14px] font-medium flex-shrink-0'>
                Đăng nhập
              </span>
            </Button>
          </div>
          <div
            className='icon-login block md:hidden cursor-pointer px-1'
            onClick={handleLogin}
          >
            <svg
              viewBox='0 0 24 24'
              preserveAspectRatio='xMidYMid meet'
              focusable='false'
              fill='currentColor'
              className='h-[32px] w-[32px] text-[#3ea6ff]'
            >
              <g>
                <path d='M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,3c4.96,0,9,4.04,9,9 c0,1.42-0.34,2.76-0.93,3.96c-1.53-1.72-3.98-2.89-7.38-3.03C14.57,12.6,16,10.97,16,9c0-2.21-1.79-4-4-4C9.79,5,8,6.79,8,9 c0,1.97,1.43,3.6,3.31,3.93c-3.4,0.14-5.85,1.31-7.38,3.03C3.34,14.76,3,13.42,3,12C3,7.04,7.04,3,12,3z M9,9c0-1.65,1.35-3,3-3 s3,1.35,3,3c0,1.65-1.35,3-3,3S9,10.65,9,9z M12,21c-3.16,0-5.94-1.64-7.55-4.12C6.01,14.93,8.61,13.9,12,13.9 c3.39,0,5.99,1.03,7.55,2.98C17.94,19.36,15.16,21,12,21z'></path>
              </g>
            </svg>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
