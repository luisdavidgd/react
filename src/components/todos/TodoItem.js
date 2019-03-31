import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TodoItem extends Component {
    getStyle = () => {
        return {
            textDecoration: this.props.todo.completed ?
                'line-through' : 'none'
        }
    }

    render() {
        const { id, title } = this.props.todo;
        return (
            <div>
                <li className="pure-menu-item">
                    <div className="pure-menu-link">
                        <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} />
                        <span style={this.getStyle()}>{title}</span>
                        <button onClick={this.props.delTodo.bind(this, id)} className="pure-button button-error" ><i class="fas fa-trash-alt"></i></button>
                    </div>

                </li>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

export default TodoItem
