import { doc, getDoc } from 'firebase/firestore'
import VideoItem from '../../components/VideoItem'
import { db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import SkeletonLoad from '../../components/SkeletonLoad'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Search() {
  const [videosData, setVideosData] = useState([])
  const [urlChannleImg, setUrlChannleImg] = useState([])

  const [resultSearch, setResultSearch] = useState([])

  const getDataFromFirebase = async () => {
    const docRef = doc(db, 'category', 'Tất cả')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()

      setVideosData(data.items)
      setUrlChannleImg(data.urlImgChannel)
    } else {
      console.log('No such document!')
    }
  }
  // const arr = []

  const { key } = useParams()

  const getResultSearch = async () => {
    const result = await axios.get(`http://localhost:4000/search/${key}`)
    setResultSearch(result.data.result)
    console.log(result.data.result)
  }

  useEffect(() => {
    getResultSearch()
  }, [key])

  useEffect(() => {
    getDataFromFirebase()
  }, [])
  return (
    <div className='wrapper w-[92%] mx-auto'>
      {resultSearch && resultSearch.length > 0 ? (
        resultSearch.map((item, index) => (
          <VideoItem
            key={`videoItem-Search-${index}`}
            item={item}
            index={index}
            search={true}
          />
        ))
      ) : (
        <div className='h-[calc(100vh_-_56px] w-full flex flex-wrap gap-4 md:justify-center'>
          Không có kết quả kết quả, vui lòng thử lại.
        </div>
      )}
    </div>
  )
}

export default Search
