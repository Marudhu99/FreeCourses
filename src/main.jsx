import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Home } from './Pages/Home.jsx'
import CourseDetail from './Pages/CourseDetail.jsx'
// import { Courses } from './Pages/Courses.jsx'
// import { About } from './Pages/About.jsx'
// import { Contact } from './Pages/Contact.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        {/* <Route path="courses" element={<Courses />} />
        <Route path='about' element={<About/>} />
        <Route path='contact' element={<Contact/>} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

