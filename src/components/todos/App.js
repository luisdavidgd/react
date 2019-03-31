import React, { Component } from 'react'
import Header from '../layouts/Header'
import Todos from './Todos'
import AddTodo from './AddTodo'
export class App extends Component {
  state = {
    title: 'To Do App',
    todos: [
      { id: Math.random(), title: 'Take out the trash', completed: false },
      { id: Math.random(), title: 'Dinner with wife', completed: false },
      { id: Math.random(), title: 'Meeting with boss', completed: false }
    ]
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    });
  }

  // del todo
  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    })
  }

  //Add todo
  addTodo = (title) => {
    const newTodo = {
      id: Math.random(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] })
  }

  render() {
    return (
      <div className="App">
        <Header title={this.state.title} />
        <AddTodo
          addTodo={this.addTodo} />
        <Todos
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo} />
      </div>
    )
  }
}

export default App
