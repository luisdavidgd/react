import { useState } from 'react'

export default function Todo() {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState<string[]>([])

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, task])
            setTask('')
        }
    }

    return (
        <div>
            <h2>To-Do</h2>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="New task"
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>
        </div>
    )
}
