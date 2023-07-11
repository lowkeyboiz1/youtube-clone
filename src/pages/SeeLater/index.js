import axios from 'axios'
import VideoItem from '../../components/VideoItem'

import { useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import styles from './SeeLater.module.scss'
import classNames from 'classnames/bind'
import { calculatorTime } from '../../util/calculatorTime'

const cx = classNames.bind(styles)

function SeeLater() {
  const listSeenState = useSelector((state) => state.listSeenReducer)
  console.log(listSeenState)
  const [loggedInUser] = useAuthState(auth)
  const navigate = useNavigate()

  const handleWatch = async (item) => {
    console.log(item)
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
  return (
    <div className={cx('seelater','flex flex-1 w-full overflow-x-scroll md:flex-wrap mt-2 md:mt-0 md:px-10 md:pr-3')}>
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
                {item ? calculatorTime(item.publicAt) : ''} trước
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center mx-auto'>Bạn chưa xem video nào.</div>
      )}
    </div>
  )
}

export default SeeLater
