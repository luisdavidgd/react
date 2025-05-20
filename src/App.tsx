import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Counter from './pages/Counter'
import Todo from './pages/Todo'
import Timer from './pages/Timer'
import Simon from './pages/Simon'
import Board from './pages/TicTacToe'
import Hangman from './pages/Hangman'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-18">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/simon" element={<Simon />} />
          <Route path="/tic-tac-toe" element={<Board />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
      </div>
    </>
  )
}
