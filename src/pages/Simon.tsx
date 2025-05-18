import { useState, useRef } from "react"

const colors = ["red", "blue", "green", "yellow"]

export default function Simon() {
    const [sequence, setSequence] = useState<string[]>([])
    const [player, setPlayer] = useState<string[]>([])
    const [locked, setLocked] = useState(true)
    const [message, setMessage] = useState("Game is starting!")
    const [round, setRound] = useState(0)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Flash effect for buttons
    const [flashing, setFlashing] = useState<string | null>(null)

    // Start next round
    function nextRound() {
        setPlayer([])
        setSequence(seq => {
            const next = [...seq, colors[Math.floor(Math.random() * colors.length)]]
            setRound(next.length)
            setMessage(`Round ${next.length}`)
            playSequence(next)
            return next
        })
    }

    // Play the sequence visually
    function playSequence(seq: string[]) {
        setLocked(true)
        let i = 0
        function flashNext() {
            setFlashing(seq[i])
            playSound(seq[i])
            timeoutRef.current = setTimeout(() => {
                setFlashing(null)
                i++
                if (i < seq.length) {
                    timeoutRef.current = setTimeout(flashNext, 300)
                } else {
                    setLocked(false)
                }
            }, 400)
        }
        flashNext()
    }

    function playSound(color: string) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const o = ctx.createOscillator()
        const g = ctx.createGain()

        const freqs: Record<string, number> = {
            red: 261.6,    // C4
            blue: 329.6,   // E4
            green: 392.0,  // G4
            yellow: 523.3  // C5
        }
        o.frequency.value = freqs[color] || 440
        o.type = "sine"
        g.gain.value = 0.2

        o.connect(g)
        g.connect(ctx.destination)
        o.start()
        o.stop(ctx.currentTime + 0.25)
        o.onended = () => ctx.close()
    }

    function playErrorSound() {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.frequency.value = 110 // Grave
        o.type = "sawtooth"
        g.gain.value = 0.3
        o.connect(g)
        g.connect(ctx.destination)
        o.start()
        o.stop(ctx.currentTime + 0.4)
        o.onended = () => ctx.close()
    }

    // Handle player input
    function handleClick(color: string) {
        if (locked) return
        const nextPlayer = [...player, color]
        setPlayer(nextPlayer)
        setFlashing(color)
        playSound(color)
        setTimeout(() => setFlashing(null), 200)

        // Check sequence
        for (let i = 0; i < nextPlayer.length; i++) {
            if (nextPlayer[i] !== sequence[i]) {
                setMessage("You lost! Click to restart.")
                setLocked(true)
                playErrorSound()
                return
            }
        }
        if (nextPlayer.length === sequence.length) {
            setMessage("Correct! Next round...")
            setLocked(true)
            setTimeout(() => nextRound(), 1000)
        }
    }

    // Start game on mount
    function startGame() {
        const first = [colors[Math.floor(Math.random() * colors.length)]]
        setSequence(first)
        setPlayer([])
        setRound(1)
        setMessage("Round 1")
        playSequence(first)
    }

    // Start game on first render
    // eslint-disable-next-line
    useState(() => { startGame() })

    return (
        <div className="flex flex-col items-center gap-6 py-8 px-2">
            <h2 className="text-2xl font-bold mb-2">Simon Says</h2>
            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-4 justify-center">
                {colors.map(color => (
                    <button
                        key={color}
                        className={`
                        w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-700
                        focus:outline-none transition
                        ${color === "red" ? "bg-red-500" : ""}
                        ${color === "blue" ? "bg-blue-600 text-white" : ""}
                        ${color === "green" ? "bg-green-500" : ""}
                        ${color === "yellow" ? "bg-yellow-300" : ""}
                        ${flashing === color ? "opacity-50 scale-110" : ""}
                        ${locked ? "cursor-not-allowed opacity-70" : "hover:opacity-80"}
                    `}
                        style={{ boxShadow: flashing === color ? "0 0 20px #fff" : undefined }}
                        onClick={() => handleClick(color)}
                        disabled={locked}
                        aria-label={color}
                    />
                ))}
            </div>
            <p className="mt-4 text-lg font-semibold">{message}</p>
            {locked && message.startsWith("You lost") && (
                <button className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    onClick={startGame}>Restart</button>
            )}
            <div className="mt-2 text-gray-400">Round: {round}</div>
        </div>
    )
}