import { useEffect, useMemo, useState } from "react"
import { useAppStore } from "../../core"
import { useAnimate } from "motion/react"

export default function Timer() {
    const word = useAppStore((store) => store.currentWord)
    const [seconds, setSeconds] = useState(0)
    const [scope, animate] = useAnimate<HTMLDivElement>()
    useEffect(() => {
        if (!word) return
        setSeconds(word.expirationTime)
        const interval = setInterval(() => {
            setSeconds((lastSecond) => lastSecond - 1)
        }, 1000);
        return () => clearInterval(interval)
    }, [word])
    useEffect(() => {
        if (seconds <= 0) useAppStore.setState({ currentWord: undefined })
        if (scope.current) {
            animate(scope.current, {
                scale: [1, 1.1, 1],
                color: ['#E74C3C','#7F8C8D']
            }, {
                ease: 'backOut'
            })
        }
    }, [seconds])
    const parsedSeconds = useMemo(() => {
        const minutesParsed = Math.floor(seconds / 60);
        const secondsParsed = seconds % 60;

        // Usa padStart para añadir un cero inicial si el número es menor de 10
        const formattedMinutes = String(minutesParsed).padStart(2, '0');
        const formattedSeconds = String(secondsParsed).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }, [seconds])
    return (
        word && <div ref={scope} className="font-inter font-bold text-xs">
            <span>{parsedSeconds}</span>
        </div>
    )
}
