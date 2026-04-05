import React from 'react'
import ExamPage from './page/ExamPage'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import {Toaster} from "react-hot-toast"
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import ResultPage from './page/ResultPage'
import AddQuestion from './page/AddQuestion'


const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/exam' element={<ProtectedRoute><ExamPage /></ProtectedRoute>} />
        <Route path='/result' element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path='/add-question' element={<AddQuestion />} />

      </Routes>
    </div>
  )
}

export default App
