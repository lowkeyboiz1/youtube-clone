function SkeletonLoad({ search, watch }) {
  return (
    <div
      className={`item w-full mt-[20px] md:w-[40%] lg:w-[30%] ${
        search && 'md:!w-full md:flex'
      } ${watch && 'md:!w-full lg:!w-full !mt-[-10px] !mb-[10px]'}`}
    >
      <div
        className={`img w-full min-h-[200px] bg-[#fff3] rounded-[12px] animate-pulse overflow-hidden ${
          search && 'md:w-[55%] md:max-w-[360px]'
        }`}
      ></div>
      <div className={`mt-3 flex ${search && 'md:flex-col md:w-full gap-2'}`}>
        <div
          className={`ava h-[36px] w-[36px] bg-[#fff3] animate-pulse rounded-full flex-shrink-0 ${
            search && 'md:mb-[10px] order-2'
          }`}
        ></div>
        {search && (
          <div className='hidden md:block w-[30%] bg-[#fff3] h-[12px] mx-2 order-1 animate-pulse rounded-[8px]'></div>
        )}
        <div className='text w-full flex flex-col gap-2 px-2'>
          <div className='w-[92%] bg-[#fff3] h-[20px] animate-pulse rounded-[8px]'></div>
          <div className='w-[80%] bg-[#fff3] h-[20px] animate-pulse rounded-[8px]'></div>
        </div>
        {search && (
          <div className='hidden md:block w-full bg-[#fff3] h-[12px] mx-2 animate-pulse rounded-[8px] order-3'></div>
        )}
      </div>
    </div>
  )
}

export default SkeletonLoad
