import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import classNames from 'classnames/bind'
import styles from './Watch.module.scss'
import { useEffect, useRef, useState } from 'react'
import { tags } from '../../pages/Home'
import VideoItem from '../VideoItem'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'

import Tippy from '@tippyjs/react'
import Footer from '../Footer'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const cx = classNames.bind(styles)

function Watch() {
  const { id } = useParams()
  const [idVideo, setIdVideo] = useState('')
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const [infoVideo, setInfoVideo] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [isPlayer1Visible, setIsPlayer1Visible] = useState(false)
  const [isPlayer2Visible, setIsPlayer2Visible] = useState(true)
  const [player1CurrentTime, setPlayer1CurrentTime] = useState(0)
  const [player2CurrentTime, setPlayer2CurrentTime] = useState(0)
  const player1Ref = useRef(null)
  const player2Ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [loggedInUser] = useAuthState(auth)

  const [like, setLike] = useState(false)
  const [unLike, setUnLike] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const navigate = useNavigate()
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

  let JSONVideoId = JSON.parse(localStorage.getItem('idVideo'))
  let JSONVideoInfo = JSON.parse(localStorage.getItem('itemInfo'))
  useEffect(() => {
    setInfoVideo(() => {
      return JSON.parse(localStorage.getItem('itemInfo'))
    })
  }, [id])

  const [title, setTitle] = useState('')

  // const arr = []
  //Call API get data homepage
  const [apiTitle, setApiTitle] = useState([])
  const getApi = async () => {
    const result = await axios.get(`http://localhost:4000?category=${title}`)
    setApiTitle(result.data.videos)
  }

  useEffect(() => {
    setIdVideo(JSONVideoId)
  }, [id])

  const handleClickTitle = (index) => {
    setCount(index)
    setTitle(tags[index].title)
  }
  useEffect(() => {
    document.title = JSONVideoInfo.titleVideo // Thay đổi tiêu đề của trang khi component được render

    // Có thể trả về một hàm cleanup từ useEffect để đặt lại tiêu đề khi component bị unmount
    return () => {
      document.title = 'Youtube' // Đặt lại tiêu đề gốc khi component bị unmount
    }
  }, [JSONVideoInfo.titleVideo])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'T' || event.key === 't') {
        setIsPlayer1Visible(!isPlayer1Visible)
        setIsPlayer2Visible(!isPlayer2Visible)

        isPlayer1Visible
          ? player2Ref.current.getInternalPlayer().playVideo()
          : player1Ref.current.getInternalPlayer().playVideo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPlayer1Visible, isPlayer2Visible])

  const handlePlayer1Progress = (progress) => {
    if (isPlayer1Visible) {
      setPlayer1CurrentTime(progress.playedSeconds)
      player2Ref.current.seekTo(progress.playedSeconds)
    }
  }

  const handlePlayer2Progress = (progress) => {
    if (isPlayer2Visible) {
      setPlayer2CurrentTime(progress.playedSeconds)
      player1Ref.current.seekTo(progress.playedSeconds)
    }
  }

  const handlePlayer1Play = () => {
    if (!isPlayer1Visible && isPlayer2Visible) {
      setIsPlayer1Visible(true)
      setIsPlayer2Visible(false)
    }
  }

  const handlePlayer2Play = () => {
    if (!isPlayer2Visible && isPlayer1Visible) {
      setIsPlayer2Visible(true)
      setIsPlayer1Visible(false)
    }
  }

  useEffect(() => {
    getApi()
  }, [title])

  const checkStatusSubscribe = async (uid) => {
    const channleId = JSON.parse(localStorage.getItem('itemInfo')).channelId
    console.log(channleId)
    try {
      const result = await axios.get(
        `http://localhost:4000/user/subscribed/${uid}/${channleId}`,
      )
      setSubscribed(result.data.isSubscribed)
      console.log(result.data)
    } catch (error) {
      console.error('Error fetching video info:', error)
      // Handle the error (e.g., show an error message to the user)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      checkStatusSubscribe(localUserInfo.uid)
    }
  }, [])

  const handleSubscribedUI = async () => {
    console.log(infoVideo)
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      const result = await axios.post('http://localhost:4000/user/subscribe', {
        uid: localUserInfo.uid,
        channleId: infoVideo.channelId,
        itemChannle: {
          channelId: infoVideo.channelId,
          VideoTitle: infoVideo.titleVideo,
          publishTime: infoVideo.publicAt,
          videoId: infoVideo.videoId,
          description: infoVideo.description,
          channelTitle: infoVideo.titleChannle,
          urlChannel: infoVideo.urlAva,
          urlThumbnail: infoVideo.urlThumbnail,
          view: infoVideo.view,
          like: infoVideo.like,
          subscriber: infoVideo.subscriber,
        },
      })

      console.log(infoVideo)
      console.log(result)
    }

    setOpen(true)
    setSubscribed(!subscribed)
  }

  const handleLikeUi = () => {
    if (like) {
      // unlike
      setLike(false)
    } else {
      //like
      setUnLike(false)
      setLike(true)
    }
  }

  const handleUnLikeUI = () => {
    if (unLike) {
      //like
      setUnLike(false)
    } else {
      //unlike
      setLike(false)
      setUnLike(true)
    }
  }
  return (
    // pt-80px
    <div
      className={`w-full flex flex-wrap justify-center ${
        !isPlayer1Visible ? 'md:pt-[80px]' : 'md:pt-[56px]'
      }`}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={subscribed ? 'Đã đăng ký kênh' : 'Đã xóa đăng ký'}
        action={action}
      />
      {/* chế độ mặc định = block */}
      <div
        className={cx(
          'player1',
          `w-full min-h-[40vh] md:h-[83vh] relative ${!isPlayer1Visible && 'hidden'} `,
        )}
      >
        <ReactPlayer
          //<video></video>
          //iframe
          ref={player1Ref}
          url={`https://www.youtube.com/watch?v=${id ? id : idVideo}`}
          controls={true}
          width='100%'
          height='100%'
          onProgress={handlePlayer1Progress}
          onPlay={handlePlayer1Play}
        />
        <Tippy content='Chế độ rạp chiếu phim (t)' arrow={false}>
          <div
            onClick={() => {
              setIsPlayer1Visible(!isPlayer1Visible)
              setIsPlayer2Visible(!isPlayer2Visible)

              isPlayer1Visible
                ? player2Ref.current.getInternalPlayer().playVideo()
                : player1Ref.current.getInternalPlayer().playVideo()
            }}
            className={cx(
              'rectangle',
              'h-[15px] w-[25px] hidden md:block border-[2px] rounded-[2px] cursor-pointer opacity-0 border-white absolute bottom-[2.5%] right-[11%]',
            )}
          >
            {/* custom rectangle */}
          </div>
        </Tippy>
      </div>
      <div
        className={cx('wrapper', 'gap-[16px] md:px-[12px] md:mx-0 lg:flex md:w-[84%]')}
      >
        <div className={`${isPlayer1Visible ? 'md:w-[120%] w-full' : 'min-h-[40vh]'}`}>
          <div
            className={cx(
              'item',
              'item1',
              `${
                !isPlayer1Visible
                  ? 'w-full block h-[240px] fixed top-0 left-0 right-0 md:static z-[200] md:pb-0 md:h-auto'
                  : 'w-full hidden'
              }`,
            )}
          >
            <div
              className={cx(
                'player2',
                'w-full h-full md:min-w-[640px] md:h-[62vh] relative',
              )}
            >
              <ReactPlayer
                ref={player2Ref}
                url={`https://www.youtube.com/watch?v=${id ? id : idVideo}`}
                controls={true}
                width='100%'
                height='100%'
                onProgress={handlePlayer2Progress}
                // playing
                onPlay={handlePlayer2Play}
              />
              <Tippy content='Chế độ rạp chiếu phim (t)' arrow={false}>
                <div
                  onClick={() => {
                    setIsPlayer1Visible(!isPlayer1Visible)
                    setIsPlayer2Visible(!isPlayer2Visible)

                    isPlayer1Visible
                      ? player2Ref.current.getInternalPlayer().playVideo()
                      : player1Ref.current.getInternalPlayer().playVideo()
                  }}
                  className={cx(
                    'rectangle2',
                    'h-[15px] w-[25px] hidden md:block border-[2px] rounded-[2px] opacity-0 cursor-pointer border-white absolute bottom-[3.4%] right-[28%] md:right-[23%]',
                  )}
                ></div>
              </Tippy>
            </div>
          </div>
          <div
            className={cx(
              'item',
              'item2',
              `w-full px-[12px] ${!isPlayer1Visible && 'pt-[240px]'} md:pt-0`,
            )}
          >
            <div className='info-video'>
              <div className='title-video text-[18px] md:text-[20px] font-normal mt-3'>
                {infoVideo ? infoVideo.titleVideo : 'not fond info Video'}
              </div>
              <div className='channle-info-like md:flex items-center justify-between mt-[8px]'>
                <div className='flex gap-3'>
                  <div
                    className='img-channle h-[40px] w-[40px] cursor-pointer'
                    onClick={() => navigate(`/DetailChannle/${infoVideo.channelId}`)}
                  >
                    <img
                      className='h-full w-full rounded-full'
                      src={infoVideo ? infoVideo.urlAva : 'not fond info Video'}
                      alt=''
                    />
                  </div>
                  <div className='flex items-center gap-[10px]'>
                    <div className='flex justify-center flex-col'>
                      <div
                        className='text-[16px] overflow-hidden line-clamp-1 max-w-[100px] cursor-pointer'
                        onClick={() => navigate(`/DetailChannle/${infoVideo.channelId}`)}
                      >
                        {infoVideo ? infoVideo.titleChannle : 'not fond info Video'}
                      </div>

                      <div className='text-[12px] text-[#AAA]'>
                        {infoVideo.subscriber} người đăng ký
                      </div>
                    </div>
                    <div className='' onClick={handleSubscribedUI}>
                      {!subscribed ? (
                        <div className='cursor-pointer px-[14px] py-[8px] text-black bg-white rounded-[20px] text-[14px] font-semibold'>
                          Đăng ký
                        </div>
                      ) : (
                        <div className='cursor-pointer flex items-center px-[10px] py-[8px] text-white bg-[#272727] rounded-[20px] text-[14px] font-semibold'>
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
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 mt-[12px] md:mt-0'>
                  <div className='control-like flex items-center bg-[#272727] rounded-[20px] overflow-hidden'>
                    <Tippy
                      content={like ? 'Bỏ thích' : 'Tôi thích video này'}
                      arrow={false}
                      placement='bottom'
                    >
                      <div
                        className='like cursor-pointer px-[14px] py-[6px] flex items-center border-r-[1px] border-[#525252] hover:bg-[#2b2b2b]'
                        onClick={handleLikeUi}
                      >
                        {like ? (
                          <div className='icon-like'>
                            <ThumbUpIcon />
                          </div>
                        ) : (
                          <div className='icon-like'>
                            <ThumbUpOffAltIcon />
                          </div>
                        )}
                        <div className='numberlike ml-[10px] text-[14px]'>
                          {infoVideo.like}
                        </div>
                      </div>
                    </Tippy>
                    <Tippy
                      content='Tôi không thích video này'
                      arrow={false}
                      placement='bottom'
                    >
                      <div
                        onClick={handleUnLikeUI}
                        className='un-like cursor-pointer px-[14px] py-[6px] pr-[10px] hover:bg-[#2b2b2b]'
                      >
                        {unLike ? (
                          <div className='icon-unlike'>
                            <ThumbDownAltIcon />
                          </div>
                        ) : (
                          <div className='icon-unlike'>
                            <ThumbDownOffAltIcon />
                          </div>
                        )}
                      </div>
                    </Tippy>
                  </div>
                  <Tippy content='Chia sẻ' arrow={false} placement='bottom'>
                    <div className='share cursor-pointer flex items-center px-[14px] py-[6px] rounded-[20px] bg-[#272727] hover:bg-[#2b2b2b]'>
                      <div className='icon-share'>
                        <svg
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                          focusable='false'
                          fill='currentColor'
                        >
                          <path d='M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z'></path>
                        </svg>
                      </div>
                      <div className='text-[14px] ml-[10px] '>Chia sẻ</div>
                    </div>
                  </Tippy>

                  <div className='dots cursor-pointer flex items-center px-[6px] rounded-full bg-[#272727] hover:bg-[#2b2b2b]'>
                    <svg
                      className='text-white'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      fill='currentColor'
                      focusable='false'
                    >
                      <path d='M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z'></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className='infodesc mt-[12px] md:mt-[16px] text-[14px] w-full p-3 rounded-[12px] bg-[#272727] hover:bg-[#2b2b2b] cursor-pointer'
                onClick={() => setShowMore(!showMore)}
              >
                <div className='flex gap-2 font-semibold'>
                  <div className='view'>
                    {infoVideo ? infoVideo.view : 'not fond info Video'} lượt xem
                  </div>
                  <div className='public'>
                    {infoVideo ? infoVideo.publicAt : 'not fond info Video'} trước
                  </div>
                </div>
                <div className='titleVideo '>{infoVideo ? infoVideo.titleVideo : ''}</div>
                <div className='font-semibold cursor-pointer'>
                  {showMore ? 'Hiện thêm' : 'Ẩn bớt'}
                </div>
              </div>
            </div>
            <div className='comment text-center text-[12px] md:text-[14px] md:flex justify-center items-center mt-[40px] gap-1'>
              <div className=''>Tính năng bình luận đã bị tắt.</div>
              <Link
                to={'https://support.google.com/youtube/answer/9706180?hl=vi'}
                target='_blank'
                className='text-[#3EA6FF]'
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
        <div className={cx('item', 'item3', 'md:px-1', isPlayer1Visible && 'mt-[30px]')}>
          <div
            className={cx(
              'tagsWatch',
              'tags flex gap-2 mb-6 mt-8 md:mt-2 px-[12px] md:px-0 max-w-[400px] overflow-x-scroll',
            )}
          >
            {tags.map(
              (tag, index) =>
                index < 4 && (
                  <div
                    className={`px-[12px] py-[5.5px] bg-[#ffffff1a] rounded-[8px]  shrink-0 text-[14px] cursor-pointer hover:bg-[#fff3] ${
                      count === index &&
                      'text-[#0f0f0f] !bg-[rgb(241,241,241)] hover:!bg-[#f1f1f1]'
                    }`}
                    key={tag.id}
                    onClick={() => handleClickTitle(index)}
                  >
                    {tag.title}
                  </div>
                ),
            )}
          </div>
          <div className='w-full'>
            {/* {apiTitle.map((item, index) => (
              <VideoItem
                key={`videoItem-${index}`}
                item={item}
                urlChannleImg={urlChannleImg}
                index={index}
                small={true}
                data={data}
              />
            ))} */}
            {apiTitle
              .filter((item, index) => item.videoId !== id)
              .map((item, index) => (
                <VideoItem
                  key={`videoItem-${index}`}
                  item={item}
                  index={index}
                  small={true}
                  data={data}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Watch
