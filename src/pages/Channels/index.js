import Tippy from '@tippyjs/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Channels() {
  const [channles, setChannles] = useState([])
  const [subscribeStatus, setSubscribeStatus] = useState(true)

  const getChannlesHaveSubscribed = async (uid) => {
    const result = await axios.get(`http://localhost:4000/user/subscriptions/${uid}`)
    console.log(result.data.subscriptions)
    setChannles(result.data.subscriptions)
  }
  const handleSubscribe = async (item) => {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      const result = await axios.post('http://localhost:4000/user/subscribe', {
        uid: localUserInfo.uid,
        channleId: item.channleId,
        itemChannle: {
          ...item.itemChannle,
        },
      })
      // console.log(result.data.user)
      getChannlesHaveSubscribed(localUserInfo.uid)
      setSubscribeStatus(result.data.user.subscribed)
    }
  }

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (localUserInfo) {
      getChannlesHaveSubscribed(localUserInfo.uid)
    }
  }, [])

  return (
    <div className='h-full w-full bg-black min-h-[calc(100vh_-_56px)]'>
      <div className='wrapper pt-[30px]'>
        {console.log(channles)}
        {channles && channles.length > 0 ? (
          <>
            {channles.map((item, index) => (
              <div
                key={index}
                className='item ml-2 md:ml-0 flex items-center md:justify-center mt-[16px] xs:px-[20px] md:px-0'
              >
                <div className='w-[40px] xs:w-[100px] md:w-[280px] lg:w-[360px] flex justify-center flex-shrink-0'>
                  <div className='img-channle w-[40px] h-[40px] xs:w-[100px] xs:h-[100px] md:w-[126px] md:h-[126px] rounded-full overflow-hidden'>
                    <img
                      className='h-full w-full object-cover'
                      src={item.itemChannle.urlChannel}
                      alt=''
                    />
                  </div>

                  {console.log(item)}
                </div>
                <div className='info-channle w-[50%] lg:w-[48%] ml-2 xs:ml-4 md:ml-0'>
                  <div className='fullname-channle flex items-center'>
                    <Tippy content={item.itemChannle.channelTitle}>
                      <div className='name text-[14px] xs:text-[16px] md:text-[18px]'>
                        {item.itemChannle.channelTitle}
                      </div>
                    </Tippy>
                    <div className='check'>
                      <svg
                        height='14'
                        viewBox='0 0 24 24'
                        width='14'
                        focusable='false'
                        fill='currentColor'
                        className='ml-1 text-[#aaa]'
                      >
                        <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z'></path>
                      </svg>
                    </div>
                  </div>
                  <div className='infoView items-center text-[#aaa] text-[12px] hidden xs:flex'>
                    <div className='subscriber'>
                      {item.itemChannle.subscriber} người đăng ký
                    </div>
                  </div>
                  <div className='hidden xs:block'>
                    <div className='desc text-[#aaa] text-[12px] line-clamp-2 overflow-hidden'>
                      {item.itemChannle.description}
                    </div>
                  </div>
                </div>

                <div className='subscribe w-[120px] md:w-[200px] flex items-center justify-end md:justify-center'>
                  <div className=''>
                    {!item.itemChannle.subscribed > 0 ? (
                      <div
                        onClick={() => handleSubscribe(item)}
                        className='cursor-pointer px-[14px] py-[6px] md:py-[8px] text-white bg-[#272727] rounded-[20px] text-[10px] md:text-[14px] font-semibold flex items-center gap-2 pr-[18px]'
                      >
                        <div className=''>
                          <svg
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            focusable='false'
                            fill='currentColor'
                            className='text-white'
                          >
                            <path d='M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z'></path>
                          </svg>
                        </div>
                        <div className=''>Đã đăng ký</div>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleSubscribe(item)}
                        className='cursor-pointer px-[14px] py-[6px] md:py-[8px] text-black bg-white rounded-[20px] text-[14px] font-semibold'
                      >
                        Đăng ký
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {/* {Array(9)
              .fill()
              .map((item, index) => (
                <div
                  key={`skeleton-channels-${index}`}
                  className='item flex items-center justify-center mt-[16px]'
                >
                  <div className='w-[280px] md:w-[360px] flex justify-center flex-shrink-0'>
                    <div className=' w-[136px] h-[136px] rounded-full overflow-hidden bg-[#fff3] animate-pulse'></div>
                  </div>
                  <div className='w-[26%] lg:w-[48%]'>
                    <div className=' bg-[#fff3] animate-pulse h-[16px] w-[100px] rounded-sm'></div>
                    <div className='bg-[#fff3] animate-pulse h-[14px] w-[120px] my-2 rounded-sm'></div>
                    <div className='bg-[#fff3] animate-pulse h-[16px] w-full rounded-sm'></div>
                    <div className='bg-[#fff3] animate-pulse h-[16px] w-full mt-2 rounded-sm'></div>
                  </div>
                  <div className='w-[200px] flex items-center justify-center'>
                    <div className='hidden md:block'>
                      <div className='text-[14px] font-semibold flex items-center gap-2 pr-[18px] bg-[#fff3] animate-pulse h-[36px] w-[120px] mt-2 rounded-3xl'></div>
                    </div>
                  </div>
                </div>
              ))} */}
            <div className='min-h-[calc(100vh_-_56px)] mt-[-40px] bg-black text-[20px] text-center flex justify-center items-center'>
              Các kênh bạn đăng ký sẽ xuất hiện ở đây.
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Channels
