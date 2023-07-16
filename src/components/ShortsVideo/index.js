import { useEffect, useRef, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import useElementOnScreen from '../../useElementOnScreen'

function ShortsVideoItem({
  urlVideo,
  titleVideo,
  titleChannle,
  urlChannleImg,
  like,
  comment,
}) {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlay, setIsPlay] = useState(false)

  const playerRef = useRef(null)
  const warpperRef = useRef(null)

  const handleVideo = () => {
    if (isPlay) {
      playerRef.current.pause()
    } else {
      playerRef.current.play()
    }
    setIsPlay(!isPlay)
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  }

  const isVisibile = useElementOnScreen(options, playerRef)

  useEffect(() => {
    if (isVisibile) {
      if (!isPlay) {
        playerRef.current.currentTime = 0
        playerRef.current.play()
        localStorage.setItem('title', JSON.stringify(titleVideo))
        setIsPlay(true)
        setTimeout(() => {
          setIsMuted(false) // Bỏ mute sau 0.1 giây
        }, 100)
      }
    } else {
      if (isPlay) {
        playerRef.current.pause()
        setIsPlay(false)
      }
    }
  }, [isVisibile])

  useEffect(() => {
    document.title = JSON.parse(localStorage.getItem('title'))
    return () => {
      document.title = 'Shorts - Youtube'
    }
  }, [JSON.parse(localStorage.getItem('title'))])

  const handleSubscribe = () => {}

  return (
    <div
      ref={warpperRef}
      className='flex snap-start justify-center mb-[56px] md:mb-[5vh] h-[calc(100vh_-_56px)] md:mt-[5vh] md:h-auto relative md:static'
    >
      <div className='video md:w-[315px] w-full h-full md:h-[86vh] rounded-[8px] relative'>
        <div
          className='reactplayerVideo object-cover w-full h-full overflow-hidden'
          // onClick={handleVideoClick}
        >
          <video
            onClick={handleVideo}
            ref={playerRef}
            src={urlVideo}
            autoPlay
            loop
            muted={isMuted}
            controls={false}
            className='h-full w-full object-fill md:object-cover'
          ></video>
        </div>
        <div className='video-info absolute bottom-[10px] md:bottom-[16px] right-0 left-0 md:px-[10px] pl-[10px] pr-[64px] flex flex-col'>
          <div className='title text-[14px] md:text-[16px] order-2 md:order-1'>
            {titleVideo}
          </div>
          <div className='info-channel flex items-center md:gap-0 md:justify-between order-1 md:order-2'>
            <div className='flex items-center gap-2'>
              <div className='ava h-[32px] w-[32px] md:h-[36px] md:w-[36px] rounded-full overflow-hidden'>
                <img src={urlChannleImg} alt='avaChanle' className='h-full w-full' />
              </div>
              <div className='username text-[12px] md:text-[14px] mr-2'>
                {titleChannle}
              </div>
            </div>
            <div
              onClick={handleSubscribe}
              className='dangki text-[10px] md:text-[14px] h-[20px] md:h-[36px] px-2 md:px-4 leading-[20px] md:leading-[36px] bg-red-900 md:bg-white text-white md:text-[black] hover:md:bg-[#e4e4e4] cursor-pointer font-medium rounded-[4px] md:rounded-[18px]'
            >
              Đăng ký
            </div>
          </div>
        </div>
      </div>
      <div className='infoShorts gap-[10px] max-w-[48px] md:text-[14px] text-[12px] flex flex-col items-center justify-center md:ml-3 absolute md:static bottom-[14px] right-1'>
        <div className='like flex flex-col items-center text-center'>
          <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px] rounded-full md:bg-[#272727] cursor-pointer hover:bg-white hover:bg-opacity-30 hover:md:bg-[#2b2b2b] flex justify-center items-center'>
            <ThumbUpIcon />
          </div>
          <div className='numberLike mt-1'>{like}</div>
        </div>
        <div className='unlike flex flex-col items-center text-center'>
          <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px] rounded-full md:bg-[#272727] cursor-pointer hover:bg-white hover:bg-opacity-30 hover:md:bg-[#2b2b2b] flex justify-center items-center'>
            <ThumbDownAltIcon />
          </div>
          <div className='numberUnLike mt-1'>Không thích</div>
        </div>
        <div className='comment flex flex-col items-center text-center'>
          <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px] rounded-full md:bg-[#272727] cursor-pointer hover:bg-white hover:bg-opacity-30 hover:md:bg-[#2b2b2b] flex justify-center items-center'>
            <svg viewBox='0 0 32 32' focusable='false' className='h-[24px] w-[24px]'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='currentColor'
                d='M5.5 3C4.11929 3 3 4.11929 3 5.5V21.5C3 22.8807 4.11929 24 5.5 24H22.5L26.7474 28.5741C27.5513 29.4399 29 28.871 29 27.6895V24V5.5C29 4.11929 27.8807 3 26.5 3H5.5ZM8 10.5C8 9.67157 8.67157 9 9.5 9H22.5C23.3284 9 24 9.67157 24 10.5C24 11.3284 23.3284 12 22.5 12H9.5C8.67157 12 8 11.3284 8 10.5ZM8 16.5C8 15.6716 8.67157 15 9.5 15H18.5C19.3284 15 20 15.6716 20 16.5C20 17.3284 19.3284 18 18.5 18H9.5C8.67157 18 8 17.3284 8 16.5Z'
              ></path>
            </svg>
          </div>
          <div className='numberComment mt-1'>{comment}</div>
        </div>
        <div className='share flex flex-col items-center text-center'>
          <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px] rounded-full md:bg-[#272727] cursor-pointer hover:bg-white hover:bg-opacity-30 hover:md:bg-[#2b2b2b] flex justify-center items-center'>
            <svg viewBox='0 0 32 32' focusable='false' className='h-[24px] w-[24px]'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='currentColor'
                d='M17.7375 5.26556L28.6745 15.2624C29.1083 15.6589 29.1083 16.3422 28.6745 16.7387L17.7375 26.7356C17.0958 27.3222 16.0628 26.8669 16.0628 25.9975V21.6217C16.0628 21.6217 16.0627 21.6217 16.0626 21.6217C9.92564 21.6217 6.69114 23.9378 5.1615 25.5968C4.80726 25.981 3.97329 25.7343 4.00015 25.2125C4.22558 20.8321 5.86088 10.8892 16.0626 10.8892C16.0627 10.8892 16.0628 10.8892 16.0628 10.8892V6.00368C16.0628 5.13426 17.0958 4.67898 17.7375 5.26556Z'
              ></path>
            </svg>
          </div>
          <div className='titleShare mt-1'>Chia sẻ</div>
        </div>
        <div className=' md:w-[48px] md:h-[48px] w-[40px] h-[40px] rounded-full md:bg-[#272727] cursor-pointer hover:bg-white hover:bg-opacity-30 hover:md:bg-[#2b2b2b] flex justify-center items-center'>
          <svg
            viewBox='0 0 24 24'
            focusable='false'
            fill='currentColor'
            className='h-[24px] w-[24px]'
          >
            <path d='M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z'></path>
          </svg>
        </div>
        <div className='ava w-[40px] h-[40px] overflow-hidden rounded-[6px] mt-1'>
          <img
            src={urlChannleImg}
            alt='avaChanle'
            className='h-full w-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default ShortsVideoItem
