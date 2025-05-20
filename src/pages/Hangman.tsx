import { useState } from "react"

// Example word list
const WORDS = ["limotación"]

function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
}

// Helper to remove accents
function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export default function Hangman() {
    // State
    const [word, setWord] = useState(getRandomWord)
    const [guessed, setGuessed] = useState<string[]>([])
    const [wrong, setWrong] = useState<string[]>([])
    const maxTries = 6

    // Derived
    const isWinner = word.split("").every(l => guessed.includes(l))
    const isLoser = wrong.length >= maxTries

    // Handlers
    function handleGuess(letter: string) {
        if (guessed.includes(letter) || wrong.includes(letter) || isWinner || isLoser) return
        // Compare without accents
        const plainWord = removeAccents(word)
        if (plainWord.includes(letter)) {
            setGuessed([...guessed, letter])
        } else {
            setWrong([...wrong, letter])
        }
    }

    function handleRestart() {
        setWord(getRandomWord())
        setGuessed([])
        setWrong([])
    }

    // Alphabet
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <h2 className="text-2xl font-bold mb-2">Hangman</h2>
            {/* Hangman drawing */}
            <div className="text-4xl font-mono tracking-widest mb-4">
                {word.split("").map((l, i) =>
                    guessed.includes(removeAccents(l)) || isLoser ? l : "_"
                ).join(" ")}
            </div>
            {/* Wrong guesses */}
            <div className="text-red-600 mb-2">
                Wrong: {wrong.join(" ")}
            </div>
            {/* Alphabet buttons */}
            <div className="grid grid-cols-7 gap-2">
                {alphabet.map(l => (
                    <button
                        key={l}
                        className={`px-2 py-1 rounded border ${guessed.includes(l) || wrong.includes(l) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-100 hover:bg-indigo-300 dark:bg-gray-700 dark:hover:bg-gray-600"} transition`}
                        onClick={() => handleGuess(l)}
                        disabled={guessed.includes(l) || wrong.includes(l) || isWinner || isLoser}
                    >
                        {l}
                    </button>
                ))}
            </div>
            {/* Status */}
            {isWinner && <div className="text-green-600 font-bold">You Win!</div>}
            {isLoser && <div className="text-red-600 font-bold">You Lose! The word was: {word}</div>}
            <button
                className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={handleRestart}
            >Restart</button>
        </div>
    )
}