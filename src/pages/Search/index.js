import VideoItem from '../../components/VideoItem'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { urlServer } from '../../urlServer'

function Search() {
  const [resultSearch, setResultSearch] = useState([])

  const { key } = useParams()

  const getResultSearch = async () => {
    const result = await axios.get(`${urlServer}/search/${key}`)
    setResultSearch(result.data.result)
  }

  useEffect(() => {
    getResultSearch()
  }, [key])

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
