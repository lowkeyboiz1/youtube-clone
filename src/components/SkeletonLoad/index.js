function SkeletonLoad({ search }) {
  return (
    <div className="item w-full mt-[20px] md:w-[40%] lg:w-[30%]">
      <div className="img w-full min-h-[200px] bg-[#fff3] rounded-[12px] animate-pulse overflow-hidden"></div>
      <div className="mt-3 flex">
        <div className="ava h-[36px] w-[36px] bg-[#fff3] animate-pulse rounded-full flex-shrink-0"></div>
        <div className="text w-full flex flex-col gap-2 px-2">
          <div className="w-[92%] bg-[#fff3] h-[20px] animate-pulse rounded-[8px]"></div>
          <div className="w-[80%] bg-[#fff3] h-[20px] animate-pulse rounded-[8px]"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoad;
