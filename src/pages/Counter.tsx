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
            <h2 className="text-xl font-bold">Counter</h2>
            <div className="text-2xl">{count}</div>

            <div className="flex gap-2">
                <button className="rounded px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    onClick={() => setCount(count - step)}>-</button>
                <button className="rounded px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    onClick={() => setCount(count + step)}>+</button>
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
                <button className="rounded px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 transition"
                    onClick={() => setCount(0)}>Reset</button>
                <button className={`rounded px-4 py-2 ${auto ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white transition`}
                    onClick={() => setAuto(!auto)}>{auto ? 'Stop Auto' : 'Start Auto'}</button>
            </div>
        </div>
    )
}

export default Counter
