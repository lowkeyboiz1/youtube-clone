import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/index'
import DefaultLayout from './layouts/DefaultLayout'
import { Fragment } from 'react'

function App() {
  return (
    <Router>
      <div className='bg-black text-white font-roboto'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            )
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App
