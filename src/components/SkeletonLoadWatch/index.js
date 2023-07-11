function SkeletonLoadWatch() {
  return (
    <div className='w-full flex flex-col md:flex-row items-center gap-2'>
      <div className='w-full md:w-[40%] bg-[#fff3] h-[100px] animate-pulse rounded-[8px]'></div>
      <div className='w-[58%] flex-col gap-1 md:flex hidden'>
        <div className='w-full bg-[#fff3] h-[16px] animate-pulse rounded-[8px]'></div>
        <div className='w-full bg-[#fff3] h-[16px] animate-pulse rounded-[8px]'></div>
        <div className='w-[20%] bg-[#fff3] h-[12px] animate-pulse rounded-[8px]'></div>
        <div className='flex gap-1'>
          <div className='w-[40%] bg-[#fff3] h-[12px] animate-pulse rounded-[8px]'></div>
          <div className='w-[40%] bg-[#fff3] h-[12px] animate-pulse rounded-[8px]'></div>
        </div>
      </div>
      <div className='flex md:hidden w-full items-center gap-2'>
        <div className='w-[40px] h-[40px] animate-pulse bg-[#fff3] rounded-full flex-shrink-0'></div>
        <div className='flex w-full flex-col gap-1'>
          <div className='w-full bg-[#fff3] h-[16px] animate-pulse rounded-[8px]'></div>
          <div className='w-full bg-[#fff3] h-[16px] animate-pulse rounded-[8px]'></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoadWatch
