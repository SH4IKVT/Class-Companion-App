import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Signup from './components/signup';
import Login from './components/login'
import Navbar from './components/navbar'
import Home from './pages/home';
import NotesLibrary from './pages/NotesLibrary';
import StudentAssignments from './pages/StudentAssignments';
import TeacherAssignments from './pages/TeacherAssignments';
import Popup from './components/popup';
import Doubts from './pages/Doubts'; 
import AnnouncementHub from "./pages/AnnouncementHub";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/dashboard';


function App() {

  return (
      <div>
        
        <BrowserRouter>
        <Navbar/>
        <Popup/> 
        <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
          {/* Notes */}
        <Route path="/notes" element={<NotesLibrary />} />  
          {/* Assignments */}
         <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />  
         <Route path="/announcements" element={<AnnouncementHub />} /> 
        </Routes>
        {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
        </BrowserRouter>
       
      </div>
      
    
  )
}

export default App
