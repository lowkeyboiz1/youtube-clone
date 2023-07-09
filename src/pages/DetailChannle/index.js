import classNames from 'classnames/bind'
import styles from './DetailChannle.module.scss'
import VideoItem from '../../components/VideoItem'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useRefhandleLogin, useState } from 'react'
import SkeletonLoad from '../../components/SkeletonLoad'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { useSelector } from 'react-redux'
import Tippy from '@tippyjs/react/headless'
import Button from '../../components/Button'
import Login from '../../components/Login'

const cx = classNames.bind(styles)

const getRandomGradient = () => {
  const gradients = [
    'from-purple-400 from-10% to-pink-500 ',
    'from-green-400 from-10% to-blue-500',
    'from-yellow-400 to-red-500',
    'from-blue-700 via-blue-500 to-green-400',
    'from-orange-500 via-yellow-400 to-yellow-300',
    'from-red-400 via-red-500 to-red-600',
    'from-pink-300 via-pink-500 to-orange-600',
    // Add more gradients as needed
  ]
  const randomIndex = Math.floor(Math.random() * gradients.length)
  return gradients[randomIndex]
}
const randomGradient = getRandomGradient()

function DetailChannle() {
  const [dataVideoChannle, setDataVideoChannle] = useState()

  const [open, setOpen] = useState(false)

  const loginState = useSelector((state) => state.loginStatusReducer)

  const listSeenState = useSelector((state) => state.listSeenReducer)

  const [subscribed, setSubscribed] = useState(false)
  const [loggedInUser] = useAuthState(auth)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const action = (
    <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
      <CloseIcon fontSize='small' />
    </IconButton>
  )

  const { id } = useParams()

  const getVideoInfoFromDb = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/detailChannle/${id}`)
      setDataVideoChannle(result.data.videos)
    } catch (error) {
      console.error('Error fetching video info:', error)
    }
  }

  const checkStatusSubscribe = async (uid) => {
    try {
      const result = await axios.get(`http://localhost:4000/user/subscribed/${uid}/${id}`)
      console.log(result.data)
      setSubscribed(result.data.isSubscribed)
    } catch (error) {
      console.error('Error fetching video info:', error)
    }
  }

  useEffect(() => {
    getVideoInfoFromDb()
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      checkStatusSubscribe(localUserInfo.uid)
    }
  }, [id])

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      checkStatusSubscribe(localUserInfo.uid)
    }
  }, [loginState])

  const handleSubscribe = async () => {
    if (loggedInUser) {
      setOpen(true)
      setSubscribed(!subscribed)

      const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (localUserInfo) {
        const result = await axios.post('http://localhost:4000/user/subscribe', {
          uid: localUserInfo.uid,
          channleId: id,
          itemChannle: {
            ...dataVideoChannle[0],
          },
        })

        console.log(result)
      }
    } else {
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='wrapper'>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={subscribed ? 'Đã đăng ký kênh' : 'Đã xóa đăng ký'}
        action={action}
      />
      {/* bg channle detail */}
      <div
        className={cx('w-full h-[17vh] md:h-[27vh] bg-gradient-to-r ', randomGradient)}
      ></div>
      {/* info channle */}
      <div className='info-channle lg:flex px-[10px] md:px-[60px] justify-between mt-[24px]'>
        <div className='warpper-info-channle md:flex text-center md:text-left'>
          <div className='ava-channle mx-auto md:mx-0 w-[50px] h-[50px] xs:w-[80px] xs:h-[80px] md:w-[128px] md:h-[128px] rounded-full overflow-hidden flex-shrink-0'>
            {dataVideoChannle ? (
              <img
                className='object-cover h-full w-full'
                src={dataVideoChannle[0].urlChannel}
                alt=''
              />
            ) : (
              <div className=' w-[128px] h-[128px] bg-[#fff3] animate-pulse'></div>
            )}
          </div>
          {dataVideoChannle ? (
            <div className='info-channle-detail flex flex-col justify-center md:ml-[24px]'>
              <div className='name-channle text-[18px] mt-2 md:mt-0 md:text-[24px] font-medium'>
                {dataVideoChannle[0].channelTitle}
              </div>
              <div className='text-[#AAA] text-[12px] md:text-[14px] flex gap-2 justify-center md:justify-items-start'>
                <div className='nickname'>
                  @{dataVideoChannle[0].channelTitle.replace(/\s/g, '')}
                </div>
                <div className='total-subsriber'>
                  {dataVideoChannle[0].subscriber} người đăng ký
                </div>
                <div className='total-video'>{dataVideoChannle.length} video</div>
              </div>
              <div className='descChannle text-[#AAA] text-[12px] md:text-[14px] mt-[2px]'>
                Xin chào mọi người mình là {dataVideoChannle[0].channelTitle}
              </div>
            </div>
          ) : (
            <div className='info-channle-detail flex flex-col justify-center ml-[24px] gap-2'>
              <div className='name-channle w-[250px] h-[24px] bg-[#fff3] animate-pulse rounded-[6px]'></div>
              <div className='text-[#AAA] text-[14px] flex gap-2'>
                <div className='nickname w-[100px] h-[24px] bg-[#fff3] animate-pulse rounded-[6px]'></div>
                <div className='total-subsriber w-[100px] h-[24px] bg-[#fff3] animate-pulse rounded-[6px]'></div>
                <div className='total-video w-[100px] h-[24px] bg-[#fff3] animate-pulse rounded-[6px]'></div>
              </div>
              <div className='descChannle text-[#AAA] text-[14px] mt-[2px] w-[180px] h-[24px] bg-[#fff3] animate-pulse rounded-[6px]'></div>
            </div>
          )}
        </div>

        {loginState ? (
          <div className=''>
            {subscribed ? (
              <div
                onClick={handleSubscribe}
                className='cursor-pointer mt-[14px] md:mt-0 md:mx-[152px] lg:mx-0 justify-center flex items-center px-[10px] py-[6px] text-white bg-[#272727] rounded-[20px] text-[14px] font-semibold w-full md:w-[250px] lg:w-[120px] lg:h-[36px]'
              >
                <div className='h-[24px] w-[24px]'>
                  <svg
                    enableBackground='new 0 0 24 24'
                    viewBox='0 0 24 24'
                    focusable='false'
                    fill='currentColor'
                    className='h-full w-full'
                  >
                    <path d='M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z'></path>
                  </svg>
                </div>
                <div className='ml-1'>Đã đăng ký</div>
              </div>
            ) : (
              <div
                onClick={handleSubscribe}
                className='dangki text-center font-medium mt-[14px] md:mt-0 md:mx-[152px] lg:mx-0 w-full md:w-[200px] lg:w-[84px] text-[14px] h-[36px] px-4 leading-[36px] bg-white text-[black] hover:bg-[#e4e4e4] cursor-pointer rounded-[18px]'
              >
                Đăng ký
              </div>
            )}
          </div>
        ) : (
          <Login>
            <div className='dangki text-center font-medium mt-[14px] md:mt-0 md:mx-[152px] lg:mx-0 w-full md:w-[200px] lg:w-[84px] text-[14px] h-[36px] px-4 leading-[36px] bg-white text-[black] hover:bg-[#e4e4e4] cursor-pointer rounded-[18px]'>
              Đăng ký
            </div>
          </Login>
        )}
      </div>
      <div className='video-channle flex flex-col justify-center mx-auto md:flex-row items-center flex-wrap md:gap-4 mt-[60px] mb-[30px]'>
        {dataVideoChannle && dataVideoChannle.length > 0 ? (
          dataVideoChannle.map((item, index) => (
            <VideoItem key={`videoItem-${index}`} item={item} index={index} />
          ))
        ) : (
          <div className='listItem w-full flex flex-wrap gap-4 md:justify-center'>
            {Array(9)
              .fill()
              .map((item, index) => (
                <SkeletonLoad key={`skeleton-home-${index}`} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailChannle
