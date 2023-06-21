function ItemIconHeader({ children, className }) {
  return (
    <div
      className={`h-[40px] w-[40px] md:rounded-full 
     bg-[#111] flex items-center justify-center hover:bg-[#212121]
     cursor-pointer ${className} hover:rounded-full`}
    >
      {children}
    </div>
  );
}

export default ItemIconHeader;
