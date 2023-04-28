import { Route, Routes } from "react-router-dom"
import NavHeader from "./components/NavHeader"
import { Students } from "./pages/students/Students"
import { Student } from "./pages/student/Student"


function App() {

  return (
    <div>
      <NavHeader/>

      <Routes>
        <Route path="/students" element={<Students />}/>
        <Route path="/student/:id" element={<Student />}/>
      </Routes>

    </div>
  )
}

export default App
