import { Route, Routes } from "react-router-dom"
import NavHeader from "./components/NavHeader"
import { Students } from "./pages/students/Students"
import { Student } from "./pages/student/Student"
import { useState } from "react"


function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <NavHeader searchText={searchText} setSearchText={setSearchText} />

      <Routes>
        <Route path="/students" element={<Students searchText={searchText} setSearchText={setSearchText} />}/>
        <Route path="/student/:id" element={<Student />}/>
      </Routes>

    </div>
  )
}

export default App
