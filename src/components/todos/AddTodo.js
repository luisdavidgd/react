import React, { Component } from 'react'

export class AddTodo extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.title) {
            this.props.addTodo(this.state.title)
            this.setState({ title: '' })
        } else return
    }

    onChange = (e) => {
        this.setState({ title: e.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="pure-form pure-g">
                    <div class="pure-u-3-4">
                        <input
                            type="text"
                            name="title"
                            className="pure-input-1"
                            placeholder="Add todo..."
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                    </div>
                    <div class="pure-u-1-4">
                        <button
                            type="submit"
                            className="pure-button pure-input-1"
                        >Add ToDo </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddTodo
