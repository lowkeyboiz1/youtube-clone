import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames/bind";
import styles from "./VideoItem.module.scss";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { useNavigate } from "react-router-dom";
import { calculatorTime } from "../../util/calculatorTime";

const cx = classnames.bind(styles);

function VideoItem({ item, urlChannleImg, index, small, data, lib, search }) {
  const [listVideoSeen, setListVideoSeen] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("listSeen");
    if (storedData) {
      setListVideoSeen(JSON.parse(storedData));
    }
  }, []);

  const handleNavigate = () => {
    localStorage.setItem("idVideo", JSON.stringify(item.id.videoId));
    localStorage.setItem(
      "itemInfo",
      JSON.stringify({
        urlAva: urlChannleImg[index],
        titleVideo: item.snippet.title,
        titleChannle: item.snippet.channelTitle,
        publicAt: calculatorTime(item.snippet.publishTime),
        view: "110 N",
      })
    );

    const newVideo = {
      idVideo: item.id.videoId,
      urlAva: urlChannleImg[index],
      urlVideo: item.snippet.thumbnails.high.url,
      titleVideo: item.snippet.title,
      titleChannle: item.snippet.channelTitle,
      publicAt: calculatorTime(item.snippet.publishTime),
      view: "110 N",
    };

    const updatedList = [newVideo, ...listVideoSeen];
    const uniqueList = Array.from(
      new Set(updatedList.map((video) => video.idVideo))
    ).map((idVideo) => updatedList.find((video) => video.idVideo === idVideo));
    // Đưa phần tử bị trùng lên đầu mảng
    const updatedUniqueList = uniqueList.sort((a, b) => {
      if (a.idVideo === newVideo.idVideo) return -1;
      if (b.idVideo === newVideo.idVideo) return 1;
      return 0;
    });
    localStorage.setItem("listSeen", JSON.stringify(updatedUniqueList));

    navigate(`/Watch/${JSON.parse(localStorage.getItem("idVideo"))}`);
  };
  return (
    // <div className="">
    //   {item.id.videoId !== JSON.parse(localStorage.getItem("idVideo")) &&
    <div
      onClick={() => handleNavigate()}
      className={cx(
        "item-video",
        !small
          ? "item-video w-full mt-[20px] md:w-[40%] lg:w-[30%] cursor-pointer"
          : "gap-2 mt-[12px] md:mt-[6px] cursor-pointer md:flex",
        search && "md:flex !w-full"
      )}
    >
      <div
        className={cx(
          "md:rounded-xl md:border-[1px] md:border-[#1f1f1f] overflow-hidden relative",
          "video",
          !small ? "w-full" : "md:!w-[170px] md:flex-shrink-0",
          search && "w-full flex-shrink-0 md:w-[360px] lg:w-[33%]"
        )}
      >
        <div
          className={`!w-full !h-[200px] ${
            small && " md:!min-w-[170px] md:!max-h-[100px]"
          }`}
        >
          <img
            src={item.snippet.thumbnails.high.url}
            alt=""
            className="!w-full !h-full object-fill md:object-cover"
          />
        </div>
      </div>

      <div
        className={`flex gap-3 mt-2 md:mt-3 px-[12px]  ${
          small &&
          "!mt-1 items-center md:items-start flex-shrink-0 md:max-w-[74%]"
        } ${search && "md:!mt-0"}`}
      >
        {!small && (
          <div
            className={`ava flex w-[36px] h-[36px] flex-shrink-0 ${
              search && "md:hidden"
            }`}
          >
            <img
              src={urlChannleImg[index]}
              alt=""
              className="h-full w-full rounded-full"
            />
          </div>
        )}
        <div
          className={`info flex-1 text-[14px] text-[#aaa] ${
            search && "flex flex-col"
          }`}
        >
          <div
            className={cx(
              "title",
              "text-base font-medium text-[#f1f1f1]",
              small && "!text-[14px] leading-[1.4] w-[100%]",
              search && "!text-[18px]"
            )}
          >
            {item ? item.snippet.title : ""}
          </div>
          <div
            className={`full-nickname flex items-center ${
              search && "order-2 my-2"
            }`}
          >
            {search && (
              <div className="w-[24px] h-[24px] mr-2 hidden md:block">
                <img
                  src={urlChannleImg[index]}
                  alt=""
                  className="h-full w-full rounded-full"
                />
              </div>
            )}
            <div
              className={`nickname hover:text-[#f1f1f1] cursor-pointer ${
                small && "text-[12px] mt-1"
              }`}
            >
              <Tippy
                content={item ? item.snippet.channelTitle : ""}
                arrow={false}
              >
                <div className={search && "md:text-[12px]"}>
                  {item ? item.snippet.channelTitle : ""}
                </div>
              </Tippy>
            </div>
            <div className="check">
              <svg
                height="14"
                viewBox="0 0 24 24"
                width="14"
                focusable="false"
                fill="currentColor"
                className="ml-1"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
              </svg>
            </div>
          </div>

          <div
            className={`view-time flex center ${small && "text-[12px]"} ${
              search && "order-1 md:text-[12px]"
            }`}
          >
            <div className="view">110 N lượt xem</div>
            <div className={cx("time-upload")}>
              {calculatorTime(item.snippet.publishTime)} trước
            </div>
          </div>
          {search && (
            <div className="description text-[14px] md:text-[12px] order-3 hidden md:block">
              {item.snippet.description}
            </div>
          )}
        </div>

        {small ? (
          <div className="w-[24px]">
            <div
              className={cx(
                "dots",
                "text-center cursor-pointer opacity-100 md:opacity-0 md:hover:opacity-100"
              )}
            >
              <span className="">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </span>
            </div>
          </div>
        ) : (
          // sau này sẽ phát triển (nút 3 chấm)
          <div></div>
        )}
      </div>
    </div>
    //   }
    // </div>
  );
}

export default VideoItem;
