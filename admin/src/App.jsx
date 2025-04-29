import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Dashboard from './pages/Dashboard/Dashboard'
import Categories from './pages/Categories/Categories'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const url = "http://localhost:4000"

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Navigate to="/dashboard" replace />} />
          <Route path='/dashboard' element={<Dashboard url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/category' element={<Categories url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
