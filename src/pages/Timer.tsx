import { useEffect, useState } from 'react'

export default function Timer() {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((s) => s + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <h2>Timer</h2>
            <p>Time passed: {seconds}s</p>
        </div>
    )
}
