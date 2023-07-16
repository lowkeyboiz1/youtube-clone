import { useEffect, useRef, useState } from 'react'
import { CloseIcon, SearchIcon } from '../../assets/Icon'
import ItemIconHeader from '../ItemIconHeader'
import React from 'react'

import SearchItem from '../SearchItem'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import axios from 'axios'
import { urlServer } from '../../urlServer'

function Search({ className, blur }) {
  const [showGlassInput, setShowGlassInput] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showResult, setShowResult] = useState(true)
  const [searchApiResult, setSearchApiResult] = useState([])

  const inputRef = useRef()

  const handleChange = (e) => {
    const value = e.target.value
    if (!value.startsWith(' ')) {
      setShowResult(true)
      setInputValue(value)
    }
  }

  const handleClear = () => {
    setInputValue('')
    inputRef.current.focus()
  }

  const navigate = useNavigate()
  const handleSearch = () => {
    if (inputValue.length > 0) {
      setShowResult(false)
      navigate(`/search/${inputValue}`)
    }
  }

  const handleSearchApi = async (inputValue) => {
    if (inputValue && inputValue.length > 0) {
      try {
        const searchResultApi = await axios.get(`${urlServer}/search/${inputValue}`)
        setSearchApiResult(searchResultApi.data.result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (inputValue.length === 0) {
      setSearchApiResult([])
      setShowResult(false)
    }
    const debounceTimer = setTimeout(() => {
      // Xử lý logic sau thời gian debounce
      handleSearchApi(inputValue)
    }, 500) // Thời gian debounce, 500ms trong ví dụ này}

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [inputValue])

  document.onkeydown = (e) => {
    if (e.which === 13 && inputValue.length > 0) {
      handleSearch()
    }
  }

  const handleClickSearch = async () => {
    navigate(`/search/${inputValue}`)
    setShowResult(false)
  }
  const searchContainerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowResult(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={searchContainerRef}
      className={`search ${
        showGlassInput ? 'lg:min-w-[631px]' : 'lg:min-w-[600px]'
      } items-center rounded-full border-[1px] border-[#303030] h-[40px] hidden flex-1 md:flex ${className}`}
    >
      {/* search input */}

      <div className='search-input relative flex items-center pl-4 pr-3 w-full md:flex-1 border-[#6c0f0f] rounded-s-full'>
        {showGlassInput && (
          <div className='icon-search-input mr-[11px] hidden md:block'>
            <div>
              <SearchIcon className='h-[20px] text-white' />
            </div>
          </div>
        )}
        {/* input search */}

        <Tippy
          interactive
          visible={showResult && inputValue.length >= 1}
          placement='bottom'
          appendTo='parent'
          render={(attrs) => (
            <div tabIndex='-1' {...attrs} className='text-red-200'>
              {inputValue.length >= 1 && showResult && (
                <div className='ml-[20px] md:ml-[8px] search-item-wrapper overflow-hidden py-[2px] md:py-2 text-black w-full bg-[#fff] z-10 rounded-[12px] '>
                  {searchApiResult && searchApiResult.length > 0 ? (
                    searchApiResult.map((item, index) => (
                      <div className='' key={index} onClick={handleClickSearch}>
                        <SearchItem title={item.VideoTitle} />
                      </div>
                    ))
                  ) : (
                    <div className='w-full ml-[20px] md:ml-[8px] flex items-center justify-center'>
                      Chưa có kết quả tìm kiếm
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        >
          <input
            className='h-[40px] w-full bg-transparent text-[#ffffffe0] outline-0 leading-[40px] caret-[#f1f1f1]'
            placeholder='Tìm kiếm'
            value={inputValue}
            ref={inputRef}
            onChange={handleChange}
            onFocus={() => {
              setShowGlassInput(true)
              setShowResult(true)
            }}
            onBlur={() => {
              setShowGlassInput(false)
            }}
          />
        </Tippy>
        <div className='key-board hover:opacity-80'>
          <img
            className='h-[11px] min-w-[20px] cursor-pointer'
            src='https://www.gstatic.com/inputtools/images/tia.png'
            alt=''
          />
        </div>
        {inputValue.length >= 1 && (
          <div className='close' onClick={handleClear}>
            <ItemIconHeader className='bg-black border-0 -mr-[10px] ml-1'>
              <CloseIcon className='h-[24px] w-[24px] text-white' />
            </ItemIconHeader>
          </div>
        )}
        {/* icon search input */}
      </div>

      {/* Search item will appear if length search value >=1   */}

      <div
        onClick={handleSearch}
        className='cursor-pointer w-[64px] h-[42px] flex items-center justify-center border-[#303030] rounded-e-full bg-[#222222] border-l-[1px]'
      >
        <SearchIcon className='h-[24px] w-[24px] text-white' />
      </div>
    </div>
  )
}

export default Search
