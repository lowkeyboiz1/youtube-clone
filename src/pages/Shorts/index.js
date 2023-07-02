import './Shorts.scss'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import Footer from '../../components/Footer'
import styles from './Shorts.module.scss'
import classNames from 'classnames/bind'
import ShortsVideoItem from '../../components/ShortsVideo'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Shorts() {
  const [dataShortFormFirebase, setDataShortFormFirebase] = useState('')

  const docRef = doc(db, 'shorts', 'shortsInfo')

  // Get a document, forcing the SDK to fetch from the offline cache.
  const getData = async () => {
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      setDataShortFormFirebase(data.items)
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='w-full bg-black mt-[-56px] md:mt-0'>
      <div className='w-full h-full'>
        <div
          className={cx(
            'wrapper',
            'wrapper pt-0 md:pt-[2vh] snap-y snap-mandatory overflow-y-scroll h-[calc(100vh_-_56px)]',
          )}
        >
          {dataShortFormFirebase && dataShortFormFirebase.length > 0 ? (
            dataShortFormFirebase.map((item, index) => (
              <ShortsVideoItem
                key={`shortItems-${index}`}
                urlVideo={item.Link_video}
                titleVideo={item.Name_video}
                titleChannle={item.Name_channle}
                urlChannleImg={item.Link_img}
                like={item.like}
                comment={item.comment}
              />
            ))
          ) : (
            <div className='w-full h-full'>
              <div className='flex snap-start justify-center mb-[56px] md:mb-[5vh] h-[calc(100vh_-_56px)] md:mt-[5vh] md:h-auto relative md:static'>
                <div className='md:w-[315px] w-full h-full md:h-[86vh] rounded-[8px] relative animate-pulse bg-[#fff3]'>
                  <div className='object-cover w-full h-full'></div>
                  <div className='absolute bottom-[10px] md:bottom-[16px] right-0 left-0 md:px-[10px] pl-[10px] pr-[64px] flex flex-col'>
                    <div className='title text-[14px] md:text-[16px] order-2 md:order-1'></div>
                    <div className='info-channel flex items-center md:gap-0 md:justify-between order-1 md:order-2'>
                      <div className='flex items-center gap-2'>
                        <div className='ava h-[32px] w-[32px] md:h-[36px] md:w-[36px] rounded-full overflow-hidden'></div>
                        <div className='username text-[12px] md:text-[14px]'></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='infoShorts gap-[10px] max-w-[48px] md:text-[14px] text-[12px] flex flex-col items-center justify-center md:ml-3 absolute md:static bottom-[14px] right-1'>
                  <div className='like flex flex-col items-center text-center'>
                    <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px] animate-pulse bg-[#fff3] rounded-full'></div>
                    <div className='numberLike mt-1 '></div>
                  </div>
                  <div className='unlike flex flex-col items-center text-center rounded-full overflow-hidden animate-pulse bg-[#fff3]'>
                    <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px]'></div>
                  </div>
                  <div className='comment flex flex-col items-center text-center '>
                    <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px] rounded-full overflow-hidden animate-pulse bg-[#fff3]'></div>
                    <div className='numberComment mt-1'></div>
                  </div>
                  <div className='share flex flex-col items-center text-center rounded-full overflow-hidden animate-pulse bg-[#fff3]'>
                    <div className='md:w-[48px] md:h-[48px] w-[40px] h-[40px]'></div>
                  </div>
                  <div className='animate-pulse bg-[#fff3] md:w-[48px] md:h-[48px] w-[40px] h-[40px] rounded-full'></div>
                  <div className='ava w-[40px] h-[40px] overflow-hidden rounded-[6px] mt-1 animate-pulse bg-[#fff3]'></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Shorts
