function SearchItem({ title = false, searched = false }) {
  return (
    <div className="search-item w-full flex items-center py-1 hover:bg-[#f2f2f2]">
      <div className="pl-[14px] pr-[12px]">
        {searched ? (
          "cais nayf code icon search"
        ) : (
          <svg
            fill="#030303"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[24px] h-[24px]"
          >
            <path d="M17.3917 16.8083L12.7333 12.15C13.625 11.125 14.1667 9.79167 14.1667 8.33333C14.1667 5.10833 11.5583 2.5 8.33333 2.5C5.10833 2.5 2.5 5.10833 2.5 8.33333C2.5 11.5583 5.10833 14.1667 8.33333 14.1667C9.79167 14.1667 11.125 13.625 12.15 12.7417L16.8083 17.4L17.3917 16.8083ZM8.33333 13.3333C5.575 13.3333 3.33333 11.0917 3.33333 8.33333C3.33333 5.575 5.575 3.33333 8.33333 3.33333C11.0917 3.33333 13.3333 5.575 13.3333 8.33333C13.3333 11.0917 11.0917 13.3333 8.33333 13.3333Z" />
          </svg>
        )}
      </div>
      <div className="title-search font-medium select-none cursor-pointer">
        {title}
      </div>
    </div>
  );
}

export default SearchItem;
