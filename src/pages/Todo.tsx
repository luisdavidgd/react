import { useEffect, useState } from 'react'
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd'

interface Task {
    id: number
    text: string
    done: boolean
}

const Todo = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')
    const [filter, setFilter] = useState<'all' | 'done' | 'pending'>('all')

    useEffect(() => {
        const saved = localStorage.getItem('todo-tasks')
        if (saved) setTasks(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem('todo-tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = () => {
        if (!newTask.trim()) return
        const task: Task = {
            id: Date.now(),
            text: newTask,
            done: false,
        }
        setTasks([task, ...tasks])
        setNewTask('')
    }

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task))
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const editTask = (id: number, newText: string) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task))
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'done') return task.done
        if (filter === 'pending') return !task.done
        return true
    })

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const newTasks = Array.from(filteredTasks)
        const [moved] = newTasks.splice(result.source.index, 1)
        newTasks.splice(result.destination.index, 0, moved)

        // Update the original tasks array with the new order
        if (filter === 'all') {
            setTasks(newTasks)
        } else {
            const updated = tasks.map(task => {
                const idx = filteredTasks.findIndex(t => t.id === task.id)
                return idx !== -1 ? newTasks[idx] : task
            })
            setTasks(updated)
        }
    }

    return (
        <div className="max-w-md mx-auto flex flex-col gap-4 p-4">
            <h2 className="text-xl font-bold">📝 To-Do List with Drag & Drop</h2>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 border px-2 py-1 rounded"
                    value={newTask}
                    placeholder="Add a new task"
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                />
                <button className="rounded px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    onClick={addTask} >Add</button>
            </div>

            <div className="flex gap-2 justify-center text-sm">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'font-bold' : ''}>All</button>
                <button onClick={() => setFilter('done')} className={filter === 'done' ? 'font-bold' : ''}>Completed</button>
                <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'font-bold' : ''}>Pending</button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="taskList">
                    {(provided) => (
                        <ul
                            className="flex flex-col gap-2"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {filteredTasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided) => (
                                        <li
                                            className="flex items-center gap-2 shadow p-2 rounded"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={task.done}
                                                onChange={() => toggleTask(task.id)}
                                            />
                                            <input
                                                className={`flex-1 border-b outline-none bg-transparent ${task.done ? 'line-through text-gray-500' : ''
                                                    }`}
                                                value={task.text}
                                                onChange={(e) => editTask(task.id, e.target.value)}
                                            />
                                            <button onClick={() => deleteTask(task.id)} className="text-red-500">🗑️</button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Todo
