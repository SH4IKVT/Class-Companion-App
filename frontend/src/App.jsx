import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login'
import Navbar from './components/navbar'
import Home from './pages/home';


function App() {

  return (
    
      <div>

        <BrowserRouter>
        <Navbar/>
        <Routes>
         
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        </Routes><Home/>
        </BrowserRouter>
       
      </div>
      
    
  )
}

export default App
