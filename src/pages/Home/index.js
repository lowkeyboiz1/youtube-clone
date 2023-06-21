import { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./Home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoItem from "../../components/VideoItem";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Footer from "../../components/Footer";
import SkeletonLoad from "../../components/SkeletonLoad";

const cx = classnames.bind(styles);

export const tags = [
  {
    id: 1,
    title: "Tất cả",
  },
  {
    id: 2,
    title: "Bóng đá",
  },
  {
    id: 3,
    title: "Nấu ăn",
  },
  {
    id: 4,
    title: "Tin tức",
  },
  {
    id: 5,
    title: "Trực tiếp",
  },
  {
    id: 6,
    title: "Toán học",
  },
  {
    id: 7,
    title: "Âm nhạc",
  },
  {
    id: 8,
    title: "Rap",
  },

  {
    id: 11,
    title: "Bóng đá",
  },
];
function Home() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [videosData, setVideosData] = useState([]);
  const [urlChannleImg, setUrlChannleImg] = useState([]);

  const getDataFromFirebase = async () => {
    const docRef = doc(db, "category", title || "Tất cả");
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
  }, [title]);

  const handleClickTitle = (index) => {
    setCount(index);
    setTitle(tags[index].title);
  };

  return (
    <div className="h-full">
      <div
        className={cx(
          "tagsHome",
          "tags flex items-center md:pl-[28px] fixed top-[56px] w-full bg-black z-[1] overflow-x-scroll md:h-[56px]"
        )}
      >
        <div className="flex gap-3 text-[14px] text-[#f1f1f1] pb-[10px] md:pb-2 p-[12px]">
          {/* <Slider {...settings}> */}
          {tags.map((tag, index) => (
            // index < 8 &&
            <div
              className={`px-[12px] py-[5.5px] bg-[#ffffff1a] rounded-[8px] cursor-pointer hover:bg-[#fff3] shrink-0 ${
                count === index &&
                "text-[#0f0f0f] !bg-[#f1f1f1] hover:!bg-[#f1f1f1]"
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
      <div className="mt-[12px]">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center flex-wrap md:gap-4 mt-[60px] mb-[30px]">
          {videosData && videosData.length > 0 ? (
            videosData.map((item, index) => (
              <VideoItem
                key={`videoItem-${index}`}
                item={item}
                urlChannleImg={urlChannleImg}
                index={index}
              />
            ))
          ) : (
            <div className="listItem w-full flex flex-wrap gap-4 md:justify-center">
              {Array(9)
                .fill()
                .map((item, index) => (
                  <SkeletonLoad key={`skeleton-home-${index}`}/>
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
