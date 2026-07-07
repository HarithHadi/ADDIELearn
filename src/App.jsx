import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import Progress from './pages/Progress'


function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
    </>
  )
}

export default App