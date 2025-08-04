import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login'
import Navbar from './components/navbar'
import Home from './pages/home';
import NotesLibrary from './pages/NotesLibrary';
import StudentAssignments from './pages/StudentAssignments';
import TeacherAssignments from './pages/TeacherAssignments';


import Doubts from './pages/Doubts'; 

// Inside <Routes> in App.jsx

function App() {

  return (
    
      <div>

        <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
          {/* Notes */}
        <Route path="/notes" element={<NotesLibrary />} />  
          {/* Assignments */}
         <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        </Routes>
        </BrowserRouter>
       
      </div>
      
    
  )
}

export default App
