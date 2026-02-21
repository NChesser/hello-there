import { useEffect } from "react";

interface ConfettiProps {
    show: boolean;
    onComplete?: () => void;
}

// Pre-generate a pool of particles once at module level (deterministic during render)
const PARTICLE_COUNT = 30;
const COLORS = ['#fb923c', '#fbbf24', '#f59e0b', '#f97316', '#ea580c'];

const Confetti = ({ show, onComplete }: ConfettiProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onComplete?.();
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-confetti"
                    style={{
                        left: `${(i * 37 + 13) % 100}%`,
                        top: '-10px',
                        backgroundColor: COLORS[i % COLORS.length],
                        animationDelay: `${(i * 0.07) % 0.5}s`,
                        animationDuration: `${1.5 + (i % 5) * 0.3}s`,
                    }}
                />
            ))}
            <style>{`
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                .animate-confetti {
                    animation: confetti-fall ease-in forwards;
                }
            `}</style>
        </div>
    );
};

export default Confetti;
