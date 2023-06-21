import { doc, getDoc } from "firebase/firestore";
import VideoItem from "../../components/VideoItem";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import SkeletonLoad from "../../components/SkeletonLoad";

function Search() {
  const [videosData, setVideosData] = useState([]);
  const [urlChannleImg, setUrlChannleImg] = useState([]);

  const getDataFromFirebase = async () => {
    const docRef = doc(db, "category", "Tất cả");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      setVideosData(data.items);
      setUrlChannleImg(data.urlImgChannel);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  // const arr = []

  useEffect(() => {
    getDataFromFirebase();
  }, []);
  return (
    <div className="wrapper w-[92%] mx-auto">
      {videosData && videosData.length > 0 ? (
        videosData.map((item, index) => (
          <VideoItem
            key={`videoItem-Search-${index}`}
            item={item}
            urlChannleImg={urlChannleImg}
            index={index}
            search={true}
          />
        ))
      ) : (
        <div className="h-[calc(100vh_-_56px] w-full flex flex-wrap gap-4 md:justify-center">
          {Array(9)
            .fill()
            .map((item, index) => (
              <SkeletonLoad key={`skeleton-home-${index}`} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Search;
