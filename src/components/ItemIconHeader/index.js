function ItemIconHeader({ children, className }) {
  return (
    <div
      className={`w-[36px] h-[36px] md:h-[40px] md:w-[40px] md:rounded-full 
     bg-[#111] flex items-center justify-center hover:bg-[#212121]
     cursor-pointer ${className} hover:rounded-full`}
    >
      {children}
    </div>
  )
}

export default ItemIconHeader
