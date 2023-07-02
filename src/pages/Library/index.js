import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Library.module.scss'
import { useNavigate } from 'react-router-dom'
import { calculatorTime } from '../../util/calculatorTime'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import axios from 'axios'

const cx = classNames.bind(styles)

function Library() {
  const [loggedInUser] = useAuthState(auth)
  const [dataSeened, setDataSeened] = useState(
    JSON.parse(localStorage.getItem('listSeen')),
  )

  useEffect(() => {
    setDataSeened(JSON.parse(localStorage.getItem('listSeen')))
  }, [])
  useEffect(() => {
    document.title = 'Thư viện - youtube' // Thay đổi tiêu đề của trang khi component được render

    // Có thể trả về một hàm cleanup từ useEffect để đặt lại tiêu đề khi component bị unmount
    return () => {
      document.title = 'Youtube' // Đặt lại tiêu đề gốc khi component bị unmount
    }
  }, [])
  useEffect(() => {
    document.title = 'Thư viện - Youtube' // Thay đổi tiêu đề của trang khi component được render

    // Có thể trả về một hàm cleanup từ useEffect để đặt lại tiêu đề khi component bị unmount
    return () => {
      document.title = 'Youtube' // Đặt lại tiêu đề gốc khi component bị unmount
    }
  }, [])
  const navigate = useNavigate()

  const handleWatch = (item) => {
    localStorage.setItem('idVideo', JSON.stringify(item.idVideo))
    localStorage.setItem(
      'itemInfo',
      JSON.stringify({
        idVideo: item.idVideo,
        urlAva: item.urlAva,
        urlVideo: item.urlVideo,
        titleVideo: item.titleVideo,
        titleChannle: item.titleChannle,
        publicAt: calculatorTime(item.publicAt),
        view: item.view,
        like: item.like,
        subscriber: item.subscriber,
      }),
    )
    navigate(`/Watch/${JSON.parse(localStorage.getItem('idVideo'))}`)
  }

  return (
    <div className='wrapper flex px-2 md:px-10 md:pl-[20px] mt-5 min-h-[calc(100vh_-_76px)]'>
      <div className='videoInfo flex-1 overflow-hidden'>
        <div className='headerInfo w-full flex justify-between md:px-10'>
          <div className='videoWatched flex'>
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
          <div className='text-[14px] text-[#3ea6ff] hover:bg-[#1a2737] mr-[-16px] md:mr-[6px] lg:mr-[10px] hover:rounded-[30px] font-semibold cursor-pointer py-[8px] px-[16px]'>
            Xem tất cả
          </div>
        </div>
        <div className='listVideo flex flex-1 w-full overflow-x-scroll md:flex-wrap mt-2 md:px-10'>
          {dataSeened && dataSeened.length > 0 ? (
            dataSeened.map((item, index) => (
              <div
                onClick={() => handleWatch(item)}
                key={`itemVideo-${index}`}
                className='itemVideo flex-shrink-0 mr-2 w-[39%] pb-[12px] md:pb-[16px] md:w-[47%] lg:w-[23.5%] mt-[10px] md:mt-[20px] ease-linear duration-100 cursor-pointer hover:bg-[#fff3] hover:md:bg-transparent hover:rounded-t-[8px] hover:overflow-hidden'
              >
                <div className='imgItemVideo rounded-[8px] overflow-hidden md:border-[1px] md:border-[#1f1f1f]'>
                  <img
                    className='w-full max-h-[120px] min-h-[90px] md:min-h-[120px] object-cover'
                    src={item.urlVideo}
                    alt=''
                  />
                </div>
                <div className='titleVideo text-[12px] md:text-[14px] mt-1 overflow-hidden line-clamp-2 '>
                  {item.titleVideo}
                </div>
                <div className='titleChannle text-[12px] mt-2 gap-1 text-[#AAAAAA] flex items-center'>
                  <div className='title overflow-hidden line-clamp-1 '>
                    {item.titleChannle}
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
                  <div className='view'>{item.view} lượt xem</div>
                  <div className={cx('time-upload')}>{item.publicAt} trước</div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center mx-auto'>Bạn chưa xem video nào.</div>
          )}
          <div className='hidden md:block border-b-[1px] border-[#fff3] mt-[30px] w-full'></div>
        </div>
      </div>
      <div className='userInfo w-[20%] text-[#AAAAAA] text-[12px] mt-[70px] md:px-6 md:pl-0 lg:px-6 hidden md:block'>
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
        <div className='border-b-[1px] border-[#fff3] flex justify-between py-2'>
          <div className=''>Kênh đăng ký</div>
          <div className=''>14</div>
        </div>
        <div className=' border-b-[1px] border-[#fff3] flex justify-between py-2'>
          <div className=''>Video tải lên</div>
          <div className=''>0</div>
        </div>
        <div className=' border-b-[1px] border-[#fff3] flex justify-between py-2'>
          <div className=''>Video đã thích</div>
          <div className=''>30</div>
        </div>
      </div>
    </div>
  )
}

export default Library
