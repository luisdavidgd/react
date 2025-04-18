import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Counter from './pages/Counter'
import Todo from './pages/Todo'
import Timer from './pages/Timer'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </>
  )
}
