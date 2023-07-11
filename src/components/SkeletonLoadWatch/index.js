function SkeletonLoadWatch() {
  return (
    <div className='w-full flex items-center gap-2'>
      <div className='w-[40%] bg-[#fff3] h-[100px] animate-pulse rounded-[8px]'></div>
      <div className='w-[58%] flex flex-col gap-1'>
        <div className='w-full bg-[#fff3] h-[16px] animate-pulse rounded-[8px]'></div>
        <div className='w-full bg-[#fff3] h-[16px] animate-pulse rounded-[8px]'></div>
        <div className='w-[20%] bg-[#fff3] h-[12px] animate-pulse rounded-[8px]'></div>
        <div className='flex gap-1'>
          <div className='w-[40%] bg-[#fff3] h-[12px] animate-pulse rounded-[8px]'></div>
          <div className='w-[40%] bg-[#fff3] h-[12px] animate-pulse rounded-[8px]'></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoadWatch
