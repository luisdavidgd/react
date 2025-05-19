import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-4 py-3 shadow mb-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <span className="font-bold text-lg flex items-center gap-2">
          <img src="./vite.svg" alt="Vite Logo" className="w-7 h-7" />
          <NavLink to="/" >React</NavLink>
        </span>
        {/* Burger button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Desktop links */}
        <div className="hidden lg:flex gap-4">
          <NavLink to="/counter" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")}>Counter</NavLink>
          <NavLink to="/todo" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")}>To-Do</NavLink>
          <NavLink to="/timer" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")}>Timer</NavLink>
          <NavLink to="/simon" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")}>Simon</NavLink>
          <NavLink to="/tic-tac-toe" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")}>Tic Tac Toe</NavLink>
        </div>
      </div>
      {/* Mobile links */}
      {open && (
        <div className="flex flex-col gap-2 mt-2 lg:hidden">
          <NavLink to="/counter" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")} onClick={() => setOpen(false)}>Counter</NavLink>
          <NavLink to="/todo" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")} onClick={() => setOpen(false)}>To-Do</NavLink>
          <NavLink to="/timer" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")} onClick={() => setOpen(false)}>Timer</NavLink>
          <NavLink to="/simon" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")} onClick={() => setOpen(false)}>Simon</NavLink>
          <NavLink to="/tic-tac-toe" className={({ isActive }) => "hover:text-indigo-400" + (isActive ? " font-bold text-indigo-400" : "")} onClick={() => setOpen(false)}>Tic Tac Toe</NavLink>
        </div>
      )}
    </nav>
  )
}