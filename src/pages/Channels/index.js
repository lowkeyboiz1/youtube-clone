import Tippy from '@tippyjs/react'
import { useState } from 'react'

function Channels() {
  const [subscribe, setSubscribe] = useState(true)

  const handleSubscribe = (index) => {
    setSubscribe(!subscribe)
    console.log(index)
  }

  // Sau này viết api lấy dữ liệu ra thay thế fakedData
  // fakeData sẽ là các kênh đã đăng kí
  const fakeData = ['1', '1', '2']
  return (
    <div className='h-full w-full bg-black min-h-[calc(100vh_-_56px)]'>
      <div className='wrapper pt-[30px]'>
        {fakeData && fakeData.length > 0 ? (
          <>
            {fakeData.map((item, index) => (
              <div
                key={index}
                className='item flex items-center justify-center mt-[16px]'
              >
                <div className='w-[280px] md:w-[360px] flex justify-center flex-shrink-0'>
                  <div className='img-channle w-[136px] h-[136px] rounded-full overflow-hidden'>
                    <img
                      className='h-full w-full object-cover'
                      src='https://yt3.googleusercontent.com/DnF7_67_DOyb5d7O0YPF94SLvLYIn6sAodWonN2BnfVHnFPQKS41qNetPkugplbEGP6g3cRRl5I=s176-c-k-c0x00ffffff-no-rj-mo'
                      alt=''
                    />
                  </div>
                </div>
                <div className='info-channle w-[26%] lg:w-[48%]'>
                  <div className='fullname-channle flex items-center'>
                    <Tippy content='AsmrProg'>
                      <div className='name text-[18px]'>AsmrProg</div>
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
                  <div className='infoView flex items-center text-[#aaa] text-[12px]'>
                    <div className='subscriber'>1 người đăng ký</div>
                    <div className='mx-1'>•</div>
                    <div className='total-video'>1 video</div>
                  </div>
                  <div className='desc text-[#aaa] text-[12px] line-clamp-2 overflow-hidden'>
                    Hello, It's me Reza Mehdikhanlou and welcome to my channel "AsmrProg".
                    Here I upload ASMR programming tutorials related to HTML, CSS, Sass,
                    JavaScript, React, PHP, Frameworks such as Bootstrap and more along
                    with creative UI/UX Designs, CSS Animation and Effects. You in this
                    channel will learn how to Create Responsive Websites and web apps
                    using modern languages, frameworks, and libraries! AsmrProg is a
                    community for web developers from all levels to learn and grow their
                    skills in front-end and back-end web development. I hope that you will
                    learn something & to stay tuned subscribe to the channel to get latest
                    updates so do Subscribe to our channel and press the bell icon to get
                    notification first. You can support me only by subscribing my channel!
                    i don't want money support! ♡ Subscribe → https://bit.ly/3Lf1K4A
                  </div>
                </div>
                <div className='subscribe w-[200px] flex items-center justify-center'>
                  <div className='hidden md:block' onClick={() => handleSubscribe(index)}>
                    {subscribe ? (
                      <div className='cursor-pointer px-[14px] py-[8px] text-white bg-[#272727] rounded-[20px] text-[14px] font-semibold flex items-center gap-2 pr-[18px]'>
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
                      <div className='cursor-pointer px-[14px] py-[8px] text-black bg-white rounded-[20px] text-[14px] font-semibold'>
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
            {Array(9)
              .fill()
              .map((index) => (
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
                    <div className='hidden md:block' onClick={handleSubscribe}>
                      <div className='text-[14px] font-semibold flex items-center gap-2 pr-[18px] bg-[#fff3] animate-pulse h-[36px] w-[120px] mt-2 rounded-3xl'></div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Channels
