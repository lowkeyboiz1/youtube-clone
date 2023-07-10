import { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames/bind'
import styles from './Home.module.scss'
import VideoItem from '../../components/VideoItem'
import { auth, db } from '../../config/firebase'
import Footer from '../../components/Footer'
import SkeletonLoad from '../../components/SkeletonLoad'
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth'

const cx = classnames.bind(styles)

export const tags = [
  {
    id: 1,
    title: 'Tất cả',
  },
  {
    id: 2,
    title: 'Bóng đá',
  },
  {
    id: 3,
    title: 'Nấu ăn',
  },
  {
    id: 4,
    title: 'Tin tức',
  },
  {
    id: 5,
    title: 'Trực tiếp',
  },
  {
    id: 6,
    title: 'Toán học',
  },
  {
    id: 7,
    title: 'Âm nhạc',
  },
  {
    id: 8,
    title: 'Rap',
  },

  {
    id: 11,
    title: 'Bóng đá',
  },
]
function Home() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('Tất cả')
  const [apiTitle, setApiTitle] = useState([])
  const [loggedInUser] = useAuthState(auth)
  const ITEMS_PER_PAGE = 9

  const [isLoading, setIsLoading] = useState(false)

  const [isFirstRender, setIsFirstRender] = useState(true)

  const [limit, setLimit] = useState(ITEMS_PER_PAGE)
  const [offset, setOffset] = useState(0)

  const [hasMore, setHasMore] = useState(false)

  const observer = useRef()

  const lastBookElementRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('visible')
          setIsLoading(true)
          setLimit((prevLimit) => prevLimit + ITEMS_PER_PAGE)
          setOffset((prevOffset) => prevOffset + ITEMS_PER_PAGE)
        }
      })

      if (node) {
        observer.current.observe(node)
      }
    },
    [hasMore],
  )

  const handleClickTitle = (index) => {
    setCount(index)
    setTitle(tags[index].title)
    window.scrollTo(0, 0)
    setIsFirstRender(true)
  }

  // Call API get data homepage
  const getApi = async () => {
    setIsLoading(true) // Bắt đầu loading

    setTimeout(async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/?category=${title}&limit=${
            isFirstRender ? 9 : limit
          }&offset=${isFirstRender ? 0 : offset}`,
        )
        setHasMore(result.data.videos.length > 0)

        isFirstRender
          ? setApiTitle(result.data.videos)
          : setApiTitle((prevDataApi) => [...prevDataApi, ...result.data.videos])
        setIsLoading(false) // Kết thúc loading sau 2 giây
        setIsFirstRender(false)
      } catch (error) {
        console.error('Error while fetching data:', error)
        setIsLoading(false) // Kết thúc loading sau 2 giây
      }
    }, 1400)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getApi()
  }, [title, limit, offset])

  return (
    <div className='h-full'>
      <div
        className={cx(
          'tagsHome',
          'tags flex items-center md:pl-[28px] fixed top-[56px] w-full bg-black z-[1] overflow-x-scroll md:h-[56px]',
        )}
      >
        <div className='flex gap-3 text-[14px] text-[#f1f1f1] pb-[10px] md:pb-2 p-[12px]'>
          {/* <Slider {...settings}> */}

          {tags.map((tag, index) => (
            // index < 8 &&
            <div
              className={`px-[12px] py-[5.5px] bg-[#ffffff1a] rounded-[8px] cursor-pointer hover:bg-[#fff3] shrink-0 ${
                count === index && 'text-[#0f0f0f] !bg-[#f1f1f1] hover:!bg-[#f1f1f1]'
              }`}
              key={tag.id}
              onClick={() => handleClickTitle(index)}
            >
              {tag.title}
            </div>
          ))}
          {/* </Slider> */}
        </div>
      </div>
      <div className='mt-[12px]'>
        <div className='flex flex-col md:flex-row items-center md:items-start justify-center flex-wrap md:gap-4 mt-[60px] mb-[30px]'>
          {apiTitle && apiTitle.length > 0 ? (
            <>
              {apiTitle.map((item, index) => {
                if (apiTitle.length === index + 1) {
                  return (
                    <VideoItem
                      ref={lastBookElementRef}
                      key={`videoItem-${index}`}
                      item={item}
                      index={index}
                    />
                  )
                } else {
                  return (
                    <VideoItem key={`videoItem-${index}`} item={item} index={index} />
                  )
                }
              })}
              {isLoading && (
                <div className='listItem w-full flex flex-wrap gap-4 md:justify-center'>
                  {Array(ITEMS_PER_PAGE)
                    .fill()
                    .map((item, index) => (
                      <SkeletonLoad key={`skeleton-home-${index}`} />
                    ))}
                </div>
              )}
            </>
          ) : (
            <div className='listItem w-full flex flex-wrap gap-4 md:justify-center'>
              {Array(ITEMS_PER_PAGE)
                .fill()
                .map((item, index) => (
                  <SkeletonLoad key={`skeleton-home-${index}`} />
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
