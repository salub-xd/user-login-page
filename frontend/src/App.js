import React from 'react'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App