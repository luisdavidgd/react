import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 shadow mb-4">
      <div className="container mx-auto flex gap-4">
        <Link to="/" className="hover:text-indigo-400">Home</Link>
        <Link to="/counter" className="hover:text-indigo-400">Counter</Link>
        <Link to="/todo" className="hover:text-indigo-400">To-Do</Link>
        <Link to="/timer" className="hover:text-indigo-400">Timer</Link>
      </div>
    </nav>
  )
}