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
import AnnouncementHub from "./pages/AnnouncementHub";
import Popup from './components/popup';

function App() {
  //  useEffect(() => {
  //    console.log('⏳ Attempting socket connection...');

  //   // connection logging
  //   socket.on('connect', () =>
  //     console.log('🔌 App detected socket.connect:', socket.id)
  //   );
  //   socket.on('connect_error', (err) =>
  //     console.error('🚨 App socket.connect_error:', err.message)
  //   );
    
  //   // Listen for new announcements from the server
  //   socket.on('newAnnouncement', (announcement) => {
  //     toast.info(`📢 New Announcement: ${announcement.title}`, {
  //       icon: '📰',
  //     })
  //   })

  //    // Cleanup listener on unmount
  //   return () => {
  //     socket.off('newAnnouncement');
  //      socket.off('connect_error');
  //     socket.off('newAnnouncement');
  //   };
  // }, [])

  return (
    
      <div>
        
        <BrowserRouter>
        <Navbar/>
        <Popup/> 
        <Routes>
        <Route path="/" element={<Home/>} />
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
