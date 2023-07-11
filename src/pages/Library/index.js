import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Library.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../../components/Button'
import { useSelector } from 'react-redux'
import { calculatorTime } from '../../util/calculatorTime'
import { urlServer } from '../../urlServer'
const cx = classNames.bind(styles)

function Library() {
  const [loggedInUser] = useAuthState(auth)
  const [signInWithGoogle] = useSignInWithGoogle(auth)

  const listSeenState = useSelector((state) => state.listSeenReducer)
  const likeVideoState = useSelector((state) => state.likeVideoReducer)

  const handleLogin = async () => {
    await signInWithGoogle()
  }

  useEffect(() => {
    document.title = 'Thư viện - Youtube' // Thay đổi tiêu đề của trang khi component được render
    // Có thể trả về một hàm cleanup từ useEffect để đặt lại tiêu đề khi component bị unmount
    return () => {
      document.title = 'Youtube' // Đặt lại tiêu đề gốc khi component bị unmount
    }
  }, [])
  const navigate = useNavigate()

  const handleWatch = async (item) => {
    localStorage.setItem('idVideo', JSON.stringify(item.videoId))
    localStorage.setItem(
      'itemInfo',
      JSON.stringify({
        idVideo: item.videoId,
        urlAva: item.urlAva,
        urlVideo: item.urlVideo,
        titleVideo: item.titleVideo,
        titleChannle: item.titleChannle,
        channelId: item.channelId,
        publicAt: item.publicAt,
        urlThumbnail: item.urlThumbnail,
        view: item.view,
        like: item.like,
        subscriber: item.subscriber,
      }),
    )

    if (loggedInUser) {
      const result = await axios.post('http://localhost:4000/user/listSeen', {
        uid: loggedInUser.uid,
        data: {
          urlAva: item.urlAva,
          titleVideo: item.titleVideo,
          titleChannle: item.titleChannle,
          publicAt: item.publicAt,
          view: item.view,
          like: item.like,
          subscriber: item.subscriber,
          channelId: item.channelId,
          urlThumbnail: item.urlThumbnail,
          videoId: item.videoId,
          description: item.description,
        },
      })
    }

    navigate(`/Watch/${item.videoId}`)
  }

  const handleWatch2 = async (item) => {
    localStorage.setItem('idVideo', JSON.stringify(item.videoId))
    localStorage.setItem(
      'itemInfo',
      JSON.stringify({
        idVideo: item.videoId,
        urlAva: item.urlChannel,
        urlVideo: item.urlVideo,
        titleVideo: item.VideoTitle,
        titleChannle: item.channelTitle,
        channelId: item.channelId,
        publicAt: item.publishTime,
        urlThumbnail: item.urlThumbnail,
        view: item.view,
        like: item.like,
        subscriber: item.subscriber,
      }),
    )

    if (loggedInUser) {
      const result = await axios.post('http://localhost:4000/user/listSeen', {
        uid: loggedInUser.uid,
        data: {
          urlAva: item.urlChannel,
          titleVideo: item.VideoTitle,
          titleChannle: item.channelTitle,
          publicAt: item.publishTime,
          view: item.view,
          like: item.like,
          subscriber: item.subscriber,
          channelId: item.channelId,
          urlThumbnail: item.urlThumbnail,
          videoId: item.videoId,
          description: item.description,
        },
      })
    }

    navigate(`/Watch/${item.videoId}`)
  }
  return (
    <div
      className={cx(
        !loggedInUser && '!px-0 mt-0',
        'wrapper flex px-2 md:px-10 md:pl-[20px] mt-5 min-h-[calc(100vh_-_76px)] justify-center',
      )}
    >
      {loggedInUser ? (
        <>
          <div className='w-full'>
            <div className='videoInfo flex-1 overflow-hidden'>
              <div className='headerInfo w-full flex justify-between md:px-10'>
                <div className='videoWatched flex items-center '>
                  <div className=''>
                    <svg
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      focusable='false'
                      fill='currentColor'
                    >
                      <g>
                        <path d='M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z'></path>
                      </g>
                    </svg>
                  </div>
                  <div className='text-[16px] ml-4'>Video đã xem</div>
                </div>
                <Link
                  to={'/seelater'}
                  className='text-[14px] text-[#3ea6ff] hover:bg-[#1a2737] mr-[-16px] md:mr-[6px] lg:mr-[10px] hover:rounded-[30px] font-semibold cursor-pointer py-[8px] px-[16px]'
                >
                  Xem tất cả
                </Link>
              </div>
              <div
                className={cx(
                  'listVideo',
                  'listVideo flex flex-1 w-full overflow-x-scroll md:flex-wrap mt-2 md:mt-0 md:px-10 md:pr-3',
                )}
              >
                {listSeenState && listSeenState.length > 0 ? (
                  listSeenState.map((item, index) => (
                    <div
                      onClick={() => handleWatch(item)}
                      key={`itemVideo-${index}`}
                      className='itemVideo flex-shrink-0 mr-2 w-[39%] pb-[12px] md:pb-[16px] md:w-[47%] lg:w-[23.5%] mt-[10px] md:mt-[20px] ease-linear duration-100 cursor-pointer hover:bg-[#fff3] hover:md:bg-transparent hover:rounded-t-[8px] hover:overflow-hidden'
                    >
                      <div className='imgItemVideo rounded-[8px] overflow-hidden md:border-[1px] md:border-[#1f1f1f]'>
                        <img
                          className='w-full max-h-[120px] min-h-[90px] md:min-h-[120px] object-cover'
                          src={item ? item.urlThumbnail : ''}
                          alt=''
                        />
                      </div>
                      <div className='titleVideo text-[12px] md:text-[14px] mt-1 overflow-hidden line-clamp-2 xs:line-clamp-1 md:line-clamp-2 '>
                        {item ? item.titleVideo : ''}
                      </div>
                      <div className='titleChannle text-[12px] mt-2 gap-1 text-[#AAAAAA] flex items-center'>
                        <div className='title overflow-hidden line-clamp-1 '>
                          {item ? item.titleChannle : ''}
                        </div>
                        <div className='check'>
                          <svg
                            height='14'
                            viewBox='0 0 24 24'
                            width='14'
                            focusable='false'
                            fill='currentColor'
                            className=''
                          >
                            <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z'></path>
                            <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z'></path>
                          </svg>
                        </div>
                      </div>
                      <div className='text-[11px] text-[#AAAAAA] hidden md:flex items-center'>
                        <div className='view'>{item ? item.view : ''} lượt xem</div>
                        <div className={cx('time-upload')}>
                          {item ? item.publicAt : ''} trước
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center mx-auto'>Bạn chưa xem video nào.</div>
                )}
                <div className='hidden md:block border-b-[1px] border-[#fff3] mt-[30px] w-full'></div>
              </div>
            </div>
            <div className='videoInfo flex-1 overflow-hidden mb-[60px]'>
              <div className='headerInfo w-full flex justify-between md:px-10'>
                <div className='videoWatched flex items-center'>
                  <div className=''>
                    <svg
                      enableBackground='new 0 0 24 24'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      focusable='false'
                      fill='currentColor'
                    >
                      <path d='M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z'></path>
                    </svg>
                  </div>
                  <div className='text-[16px] ml-4'>Video đã thích</div>
                </div>
                <Link
                  to={'/liked'}
                  className='text-[14px] text-[#3ea6ff] hover:bg-[#1a2737] mr-[-16px] md:mr-[6px] lg:mr-[10px] hover:rounded-[30px] font-semibold cursor-pointer py-[8px] px-[16px]'
                >
                  Xem tất cả
                </Link>
              </div>
              <div
                className={cx(
                  'listVideo',
                  'listVideo flex flex-1 w-full overflow-x-scroll md:flex-wrap mt-2 md:mt-0 md:px-10 md:pr-3',
                )}
              >
                {likeVideoState && likeVideoState.length > 0 ? (
                  likeVideoState.map((item, index) => (
                    <div
                      onClick={() => handleWatch2(item.itemLike)}
                      key={`itemVideo-${index}`}
                      className='itemVideo flex-shrink-0 mr-2 w-[39%] pb-[12px] md:pb-[16px] md:w-[47%] lg:w-[23.5%] mt-[10px] md:mt-[20px] ease-linear duration-100 cursor-pointer hover:bg-[#fff3] hover:md:bg-transparent hover:rounded-t-[8px] hover:overflow-hidden'
                    >
                      <div className='imgItemVideo rounded-[8px] overflow-hidden md:border-[1px] md:border-[#1f1f1f]'>
                        <img
                          className='w-full max-h-[120px] min-h-[90px] md:min-h-[120px] object-cover'
                          src={item ? item.itemLike.urlThumbnail : ''}
                          alt=''
                        />
                      </div>
                      <div className='titleVideo text-[12px] md:text-[14px] mt-1 overflow-hidden line-clamp-2 xs:line-clamp-1 md:line-clamp-2 '>
                        {item ? item.itemLike.VideoTitle : ''}
                      </div>
                      <div className='titleChannle text-[12px] mt-2 gap-1 text-[#AAAAAA] flex items-center'>
                        <div className='title overflow-hidden line-clamp-1 '>
                          {item ? item.itemLike.channelTitle : ''}
                        </div>
                        <div className='check'>
                          <svg
                            height='14'
                            viewBox='0 0 24 24'
                            width='14'
                            focusable='false'
                            fill='currentColor'
                            className=''
                          >
                            <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z'></path>
                            <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z'></path>
                          </svg>
                        </div>
                      </div>
                      <div className='text-[11px] text-[#AAAAAA] hidden md:flex items-center'>
                        <div className='view'>
                          {item ? item.itemLike.view : ''} lượt xem
                        </div>
                        <div className={cx('time-upload')}>
                          {item ? item.itemLike.publishTime : ''} trước
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center mx-auto'>Bạn chưa thích video nào.</div>
                )}
                <div className='hidden md:block border-b-[1px] border-[#fff3] mt-[30px] w-full'></div>
              </div>
            </div>
          </div>
          <div className='userInfo w-[20%] text-[#AAAAAA] text-[12px] mt-[70px]  md:px-0 lg:px-6 hidden md:block'>
            <div className='wrapperUser'>
              <div className='ImgAndNameUser border-b-[1px] border-[#fff3] flex items-center gap-3 flex-col'>
                <div className='imgUser h-[80px] w-[80px] rounded-full overflow-hidden'>
                  {loggedInUser ? (
                    <img
                      className={`h-full w-full object-cover
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
                <div
                  className={`text-[#f1f1f1] text-[16px] mb-[30px] ${
                    !loggedInUser &&
                    'bg-gradient-to-r from-gray-300 animate-pulse to-gray-100 h-[24px] w-[70%]'
                  }`}
                >
                  {loggedInUser ? loggedInUser.displayName : ''}
                </div>
              </div>
            </div>
            <div className='border-b-[1px] border-[#fff3] flex items-center justify-between py-2'>
              <div className=''>Kênh đăng ký</div>
              <div className=''>{listSeenState ? listSeenState.length : 0}</div>
            </div>
            <div className=' border-b-[1px] border-[#fff3] flex justify-between py-2'>
              <div className=''>Video tải lên</div>
              <div className=''>0</div>
            </div>
            <div className=' border-b-[1px] border-[#fff3] flex justify-between py-2'>
              <div className=''>Video đã thích</div>
              <div className=''>{likeVideoState ? likeVideoState.length : 0}</div>
            </div>
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center flex-col'>
          <div className='h-[100px] w-[100px] md:h-[120px] md:w-[120px]'>
            <svg
              enableBackground='new 0 0 24 24'
              viewBox='0 0 24 24'
              focusable='false'
              fill='currentColor'
              className='h-full w-full'
            >
              <path d='m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z'></path>
            </svg>
          </div>
          <div className='text-[#f1f1f1] text-[20px] md:text-[24px] mt-[24px] mb-[16px]'>
            Thưởng thức các video yêu thích của bạn
          </div>
          <div className='text-[#f1f1f1] text-[11px] md:text-[12px] mb-[24px]'>
            Đăng nhập để truy cập video bạn đã thích hoặc đã lưu
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
              <span className='text-[#3ea6ff] text-[14px] font-medium'>Đăng nhập</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Library
