import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

function DefaultLayout({ children }) {
  const [isShort, setIsShort] = useState(false)
  const currentURL = document.location.pathname

  const handleURLChange = () => {
    const currentURL = document.location.pathname

    if (currentURL.includes('/Shorts')) {
      setIsShort(true)
      localStorage.setItem('selectSidebar', 1)
      document.title = 'Shorts - Youtube'
    } else {
      setIsShort(false)
    }
    if (currentURL.includes('/RegisterChanel')) {
      localStorage.setItem('selectSidebar', 2)
      document.title = 'Kênh đăng ký - Youtube'
    }

    if (currentURL.includes('/Library')) {
      localStorage.setItem('selectSidebar', 3)
      document.title = 'Thư viện - Youtube'
    }

    if (currentURL.length === 1) {
      localStorage.setItem('selectSidebar', 0)
      document.title = 'Youtube'
    }
  }
  useEffect(() => {
    handleURLChange() // Gọi handleURLChange ban đầu để cập nhật giá trị isShort
  }, [currentURL])

  return (
    <>
      <div className={isShort ? 'hidden md:block' : ''}>
        <Header />
      </div>

      <div className='flex w-full'>
        <Sidebar />
        <div className='mt-[56px] md:ml-[68px] w-full h-full min-h-[calc(100vh_-_56px)]'>
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DefaultLayout
