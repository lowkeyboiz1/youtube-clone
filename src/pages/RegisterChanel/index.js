import Tippy from '@tippyjs/react';
import SkeletonLoad from '../../components/SkeletonLoad';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import VideoItem from '../../components/VideoItem';
import { Link } from 'react-router-dom';

function RegisterChanel() {
  let resgister = ['1'];
  const [videosData, setVideosData] = useState([]);
  const [urlChannleImg, setUrlChannleImg] = useState([]);
  const getDataFromFirebase = async () => {
    const docRef = doc(db, 'category', 'Tất cả');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setVideosData(data.items);
      setUrlChannleImg(data.urlImgChannel);
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
  // const arr = []

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  return (
    <div className="mt-[40px]">
      {resgister && resgister.length > 0 ? (
        <div className="min-h-[calc(100vh_-_56px)] w-[93%] mx-auto ">
          <div className="header flex justify-between items-center w-[93%] mx-auto">
            <div className="font-medium text-[16px]">Mới nhất</div>
            <div className="flex justify-center items-center gap-[2px]">
              <Link
                to={'/Channels'}
                className="text-[14px] text-[#3ea6ff] hover:bg-[#1a2737] hover:rounded-[30px] font-semibold cursor-pointer py-[8px] px-[16px]"
              >
                Quản lý
              </Link>
              <Tippy content="Lưới">
                <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2b2b2b] hover:rounded-full">
                  <svg viewBox="0 0 24 24" focusable="false" fill="currentColor" className="h-[24px] w-[24px]">
                    <path d="M2,4h6v7H2V4z M2,20h6v-7H2V20z M9,11h6V4H9V11z M9,20h6v-7H9V20z M16,4v7h6V4H16z M16,20h6v-7h-6V20z"></path>
                  </svg>
                </div>
              </Tippy>
              <Tippy content="Danh sách">
                <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2b2b2b] hover:rounded-full">
                  <svg viewBox="0 0 24 24" focusable="false" fill="currentColor" className="h-[24px] w-[24px]">
                    <path d="M20 8H9V7h11v1zm0 3H9v1h11v-1zm0 4H9v1h11v-1zM7 7H4v1h3V7zm0 4H4v1h3v-1zm0 4H4v1h3v-1z"></path>
                  </svg>
                </div>
              </Tippy>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center flex-wrap md:gap-4">
            {videosData && videosData.length > 0 ? (
              videosData.map((item, index) => (
                <VideoItem key={`videoItem-${index}`} item={item} urlChannleImg={urlChannleImg} index={index} />
              ))
            ) : (
              <div className="listItem w-full flex flex-wrap gap-4 md:justify-center">
                {Array(9)
                  .fill()
                  .map((item, index) => (
                    <SkeletonLoad key={`skeleton-home-${index}`} />
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-[calc(100vh_-_56px)] bg-black text-[20px] text-center flex justify-center items-center">
          Các kênh bạn đăng ký sẽ xuất hiện ở đây.
        </div>
      )}
    </div>
  );
}

export default RegisterChanel;
