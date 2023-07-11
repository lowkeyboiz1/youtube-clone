import { Logo, MenuIcon } from '../../assets/Icon'
import ItemIconHeader from '../ItemIconHeader'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../../redux/actions/toggle'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function MenuHeader({ className }) {
  const toggleMenu = useSelector((state) => state.toggleSidebarReducer)
  const dispatch = useDispatch()
  const [select, setSelect] = useState(0)

  return (
    <div className={`start items-center z-30 flex ${className}`}>
      {/* Menu */}
      <div className='menu hidden md:block' onClick={() => dispatch(toggle(toggleMenu))}>
        <ItemIconHeader className='bg-black border-0'>
          <MenuIcon className='h-[24px] w-[24px] text-white' />
        </ItemIconHeader>
      </div>
      {/* logo */}
      <div
        className='logo h-5 w-[90px] relative ml-1 md:ml-[1px]'
        onClick={() => {
          window.scrollTo(0, 0)
          setSelect(localStorage.setItem('selectSidebar', 0))
        }}
      >
        <Link to={'/'} onClick={() => dispatch(toggle(true))}>
          <Logo className='w-[120px] h-full text-white cursor-pointer' />
        </Link>
        <span className='absolute text-[#aaa] -top-[7px] -right-[33px] text-[10px] '>
          VN
        </span>
      </div>
    </div>
  )
}

export default MenuHeader
