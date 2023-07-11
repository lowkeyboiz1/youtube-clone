import VideoItem from '../../components/VideoItem'

import { useSelector } from 'react-redux'

function Liked() {
  const likeVideoState = useSelector((state) => state.likeVideoReducer)
  return (
    <div className='wrapper w-[92%] mx-auto'>
      {likeVideoState && likeVideoState.length > 0 ? (
        likeVideoState.map((item, index) => (
          <VideoItem
            key={`videoItem-Search-${index}`}
            item={item.itemLike}
            index={index}
            search={true}
            liked={true}
          />
        ))
      ) : (
        <div className='h-[calc(100vh_-_56px] w-full flex flex-wrap gap-4 md:justify-center'>
          Các video mà bạn đã thích sẽ xuất hiện ở đây
        </div>
      )}
    </div>
  )
}

export default Liked
