import React from 'react'

interface TimerState {
    inputMinutes: number
    duration: number
    remaining: number
    isRunning: boolean
}

export default class Timer extends React.Component<{}, TimerState> {
    intervalId: number | undefined

    state: TimerState = {
        inputMinutes: 5,
        duration: 300,
        remaining: 300,
        isRunning: false
    }

    componentWillUnmount() {
        window.clearInterval(this.intervalId)
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minutes = parseInt(e.target.value)
        if (!isNaN(minutes) && minutes >= 0) {
            this.setState({
                inputMinutes: minutes,
                duration: minutes * 60,
                remaining: minutes * 60
            })
        }
    }

    start = () => {
        if (this.state.isRunning) return

        this.setState({ isRunning: true })
        this.intervalId = window.setInterval(() => {
            this.setState(prev => {
                if (prev.remaining <= 1) {
                    window.clearInterval(this.intervalId)
                    return { ...prev, isRunning: false, remaining: 0 }
                }
                return { ...prev, remaining: prev.remaining - 1 }
            })
        }, 1000)
    }

    pause = () => {
        window.clearInterval(this.intervalId)
        this.setState({ isRunning: false })
    }

    reset = () => {
        window.clearInterval(this.intervalId)
        this.setState({
            remaining: this.state.duration,
            isRunning: false
        })
    }

    formatTime(seconds: number) {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    render() {
        const { remaining, isRunning, inputMinutes } = this.state

        return (
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">{this.formatTime(remaining)}</h1>

                <div>
                    <label className="block mb-2 font-semibold">Set Minutes</label>
                    <input
                        type="number"
                        min="0"
                        value={inputMinutes}
                        onChange={this.handleChange}
                        disabled={isRunning}
                        className="p-2 border rounded text-center"
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={this.start} disabled={isRunning} className="px-4 py-2 bg-green-500 text-white rounded">
                        Start
                    </button>
                    <button onClick={this.pause} disabled={!isRunning} className="px-4 py-2 bg-yellow-500 text-white rounded">
                        Pause
                    </button>
                    <button onClick={this.reset} className="px-4 py-2 bg-red-500 text-white rounded">
                        Reset
                    </button>
                </div>
            </div>
        )
    }
}
