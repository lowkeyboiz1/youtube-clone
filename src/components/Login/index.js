import { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import Button from '../Button'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'

function Login({ children }) {
  const [openModalLogin, setOpenModalLogin] = useState(false)

  const [signInWithGoogle] = useSignInWithGoogle(auth)

  const handleLogin = () => {
    signInWithGoogle()
  }

  const handleOpenModalLogin = () => {
    setOpenModalLogin(true)
  }

  const handleCloseModalLogin = () => {
    setOpenModalLogin(false)
  }
  return (
    <Tippy
      visible={openModalLogin}
      onClickOutside={handleCloseModalLogin}
      interactive
      placement='bottom'
      render={(attrs) => (
        <div
          className='bg-[#212121] max-w-[400px] px-4 py-2 rounded-[6px]'
          tabIndex='-1'
          {...attrs}
        >
          <div className='text-[16px] mb-[10px]'>Bạn muốn đăng ký kênh này?</div>
          <div className='text-[14px] text-[#AAA]'>Đăng nhập để đăng ký kênh này.</div>

          <Button
            onClick={handleLogin}
            className='flex mt-6 items-center justify-center border-[1px] border-[#3f3f3f] rounded-full px-3 py-1 hover:bg-[#1a2737] cursor-pointer'
          >
            <div className='icon-login'>
              <svg
                viewBox='0 0 24 24'
                preserveAspectRatio='xMidYMid meet'
                focusable='false'
                fill='currentColor'
                className='h-[24px] w-[24px] text-[#3ea6ff] mr-[6px]'
              >
                <g>
                  <path d='M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,3c4.96,0,9,4.04,9,9 c0,1.42-0.34,2.76-0.93,3.96c-1.53-1.72-3.98-2.89-7.38-3.03C14.57,12.6,16,10.97,16,9c0-2.21-1.79-4-4-4C9.79,5,8,6.79,8,9 c0,1.97,1.43,3.6,3.31,3.93c-3.4,0.14-5.85,1.31-7.38,3.03C3.34,14.76,3,13.42,3,12C3,7.04,7.04,3,12,3z M9,9c0-1.65,1.35-3,3-3 s3,1.35,3,3c0,1.65-1.35,3-3,3S9,10.65,9,9z M12,21c-3.16,0-5.94-1.64-7.55-4.12C6.01,14.93,8.61,13.9,12,13.9 c3.39,0,5.99,1.03,7.55,2.98C17.94,19.36,15.16,21,12,21z'></path>
                </g>
              </svg>
            </div>
            <span className='text-[#3ea6ff] text-[14px] font-medium'>Đăng nhập</span>
          </Button>
        </div>
      )}
    >
      <div className='' onClick={handleOpenModalLogin}>
        {children}
      </div>
    </Tippy>
  )
}

export default Login
