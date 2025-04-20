import { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem('counter')
        return saved ? parseInt(saved) : 0
    })
    const [step, setStep] = useState(1)
    const [auto, setAuto] = useState(false)

    useEffect(() => {
        localStorage.setItem('counter', count.toString())
    }, [count])

    useEffect(() => {
        if (!auto) return

        const interval = setInterval(() => {
            setCount((prev) => prev + step)
        }, 1000)

        return () => clearInterval(interval)
    }, [auto, step])

    return (
        <div className="flex flex-col gap-4 items-center">
            <h2>Counter</h2>
            <div className="text-2xl">{count}</div>

            <div className="flex gap-2">
                <button onClick={() => setCount(count - step)}>-</button>
                <button onClick={() => setCount(count + step)}>+</button>
            </div>

            <div>
                <label>Step: </label>
                <input
                    type="number"
                    value={step}
                    onChange={(e) => setStep(parseInt(e.target.value))}
                />
            </div>

            <div className="flex gap-2">
                <button onClick={() => setCount(0)}>Reset</button>
                <button onClick={() => setAuto(!auto)}>
                    {auto ? 'Stop Auto' : 'Start Auto'}
                </button>
            </div>
        </div>
    )
}

export default Counter
