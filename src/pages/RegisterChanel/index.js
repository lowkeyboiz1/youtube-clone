import Tippy from '@tippyjs/react'
import SkeletonLoad from '../../components/SkeletonLoad'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import VideoItem from '../../components/VideoItem'
import { Link } from 'react-router-dom'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import Button from '../../components/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { urlServer } from '../../urlServer'

function RegisterChanel() {
  //register is dataform mongodb user subscriber
  const [loggedInUser] = useAuthState(auth)

  const [channles, setChannles] = useState([])

  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const handleLogin = () => {
    signInWithGoogle()
  }

  const loginState = useSelector((state) => state.loginStatusReducer)

  const getChannlesHaveSubscribed = async (uid) => {
    const result = await axios.get(`${urlServer}/user/subscriptions/${uid}`)

    setChannles(result.data.subscriptions)
  }

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      getChannlesHaveSubscribed(localUserInfo.uid)
    }
  }, [loginState])

  return (
    <div className='mt-[40px]'>
      {loggedInUser ? (
        <>
          {channles && channles.length > 0 ? (
            <div className='min-h-[calc(100vh_-_56px)] w-[93%] mx-auto '>
              <div className='header flex justify-between items-center w-[93%] mx-auto'>
                <div className='font-medium text-[16px]'>Mới nhất</div>
                <div className='flex justify-center items-center gap-[2px]'>
                  <Link
                    to={'/Channels'}
                    className='text-[14px] text-[#3ea6ff] hover:bg-[#1a2737] hover:rounded-[30px] font-semibold cursor-pointer py-[8px] px-[16px]'
                  >
                    Quản lý
                  </Link>
                  <Tippy content='Lưới'>
                    <div className='w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2b2b2b] hover:rounded-full'>
                      <svg
                        viewBox='0 0 24 24'
                        focusable='false'
                        fill='currentColor'
                        className='h-[24px] w-[24px]'
                      >
                        <path d='M2,4h6v7H2V4z M2,20h6v-7H2V20z M9,11h6V4H9V11z M9,20h6v-7H9V20z M16,4v7h6V4H16z M16,20h6v-7h-6V20z'></path>
                      </svg>
                    </div>
                  </Tippy>
                  <Tippy content='Danh sách'>
                    <div className='w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2b2b2b] hover:rounded-full'>
                      <svg
                        viewBox='0 0 24 24'
                        focusable='false'
                        fill='currentColor'
                        className='h-[24px] w-[24px]'
                      >
                        <path d='M20 8H9V7h11v1zm0 3H9v1h11v-1zm0 4H9v1h11v-1zM7 7H4v1h3V7zm0 4H4v1h3v-1zm0 4H4v1h3v-1z'></path>
                      </svg>
                    </div>
                  </Tippy>
                </div>
              </div>
              <div className='flex flex-col md:flex-row items-center md:items-start justify-center flex-wrap md:gap-4 mb-[60px]'>
                {channles && channles.length > 0 ? (
                  channles.map((item, index) => (
                    <VideoItem
                      key={`videoItemRegister-${item.itemChannle.videoId || index}`}
                      item={item.itemChannle}
                      index={index}
                    />
                  ))
                ) : (
                  <div className='listItem w-full flex flex-wrap gap-4 md:justify-center'>
                    {Array(9)
                      .fill()
                      .map((item, index) => (
                        <SkeletonLoad key={`skeleton-ItemRegister-${index}`} />
                      ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='min-h-[calc(100vh_-_56px)] mt-[-40px] bg-black text-[20px] text-center flex justify-center items-center'>
              Các kênh bạn đăng ký sẽ xuất hiện ở đây.
            </div>
          )}
        </>
      ) : (
        <div className='flex justify-center items-center flex-col min-h-[calc(100vh_-_76px)] mt-[-40px]'>
          <div className='h-[100px] w-[100px] md:h-[120px] md:w-[120px]'>
            <svg
              enableBackground='new 0 0 24 24'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-full w-full'
              focusable='false'
            >
              <path d='M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z'></path>
            </svg>
          </div>
          <div className='text-[#f1f1f1] text-[20px] md:text-[24px] mt-[24px] mb-[16px]'>
            Đừng bỏ lỡ video mới
          </div>
          <div className='text-[#f1f1f1] text-[11px] md:text-[12px] mb-[24px]'>
            Đăng nhập để xem cập nhật từ các kênh YouTube yêu thích của bạn
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

export default RegisterChanel
