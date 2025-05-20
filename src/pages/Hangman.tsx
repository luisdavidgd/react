import { useState, useEffect } from "react"

function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function isLetter(char: string) {
    return /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/.test(char)
}

function normalizeLetter(char: string) {
    return removeAccents(char.toLowerCase())
}

async function fetchRandomWord(lang: string): Promise<string> {
    const url = lang === "en"
        ? "https://random-word-api.herokuapp.com/word"
        : `https://random-word-api.herokuapp.com/word?lang=${lang}`
    const res = await fetch(url)
    const data = await res.json()
    // const data = ['Paracaídas']
    console.log(data)
    return data[0]
}

export default function Hangman() {
    const [word, setWord] = useState<string>("")
    const [guessed, setGuessed] = useState<string[]>([])
    const [wrong, setWrong] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState<"en" | "es">("es")
    const [pressedKey, setPressedKey] = useState<string | null>(null)
    const maxTries = 6

    useEffect(() => {
        setLoading(true)
        fetchRandomWord(lang).then(w => {
            setWord(w)
            setGuessed([])
            setWrong([])
            setLoading(false)
        })
    }, [lang])

    const isWinner = word &&
        word.split("").every(l =>
            !isLetter(l) || guessed.includes(normalizeLetter(l))
        )
    const isLoser = wrong.length >= maxTries

    function handleGuess(letter: string) {
        letter = normalizeLetter(letter)
        if (guessed.includes(letter) || wrong.includes(letter) || isWinner || isLoser) return
        const plainWord = removeAccents(word.toLowerCase())
        if (plainWord.includes(letter)) {
            setGuessed([...guessed, letter])
        } else {
            setWrong([...wrong, letter])
        }
    }

    function handleRestart() {
        setLoading(true)
        fetchRandomWord(lang).then(w => {
            setWord(w)
            setGuessed([])
            setWrong([])
            setLoading(false)
        })
    }

    // Keyboard support and button press effect
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            const letter = e.key.toLowerCase()
            if (letter.length === 1 && letter >= "a" && letter <= "z") {
                setPressedKey(letter)
                handleGuess(letter)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [guessed, wrong, isWinner, isLoser, word])

    // Remove pressed effect after 150ms
    useEffect(() => {
        if (pressedKey) {
            const timeout = setTimeout(() => setPressedKey(null), 150)
            return () => clearTimeout(timeout)
        }
    }, [pressedKey])

    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

    if (loading) {
        return <div className="flex flex-col items-center gap-6 py-8">Loading...</div>
    }

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <h2 className="text-2xl font-bold mb-2">Hangman</h2>
            {/* Language selector */}
            <div className="mb-2">
                <label className="mr-2 font-semibold">Language:</label>
                <select
                    value={lang}
                    onChange={e => setLang(e.target.value as "en" | "es")}
                    className="border rounded px-2 py-1 bg-white text-black dark:bg-gray-800 dark:text-white"
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </div>
            <div className="text-4xl font-mono tracking-widest mb-4">
                {word.split("").map((l, i) =>
                    !isLetter(l)
                        ? (l === " " ? "\u00A0" : l) // Show dot for space, else show char
                        : (guessed.includes(normalizeLetter(l)) || isLoser ? l : "_")
                ).join(" ")}
            </div>
            <div className="text-red-600 mb-2">
                Wrong: {wrong.join(" ")}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {alphabet.map(l => (
                    <button
                        key={l}
                        className={`px-2 py-1 rounded border transition
                            ${guessed.includes(l) || wrong.includes(l)
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-indigo-100 hover:bg-indigo-300 dark:bg-gray-700 dark:hover:bg-gray-600"}
                            ${pressedKey === l ? "scale-90 ring-2 ring-indigo-400" : ""}
                        `}
                        onClick={() => handleGuess(l)}
                        disabled={guessed.includes(l) || wrong.includes(l) || isWinner || isLoser}
                    >
                        {l}
                    </button>
                ))}
            </div>
            {isWinner && <div className="text-green-600 font-bold">You Win!</div>}
            {isLoser && <div className="text-red-600 font-bold">You Lose! The word was: {word}</div>}
            <button
                className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={handleRestart}
            >Restart</button>
        </div>
    )
}