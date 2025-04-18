import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav style={{ marginBottom: '1rem' }}>
            <Link to="/">Home</Link> |{' '}
            <Link to="/counter">Counter</Link> |{' '}
            <Link to="/todo">To-Do</Link> |{' '}
            <Link to="/timer">Timer</Link>
        </nav>
    )
}
