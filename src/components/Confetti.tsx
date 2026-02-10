import { useEffect, useState } from "react";

interface ConfettiProps {
    show: boolean;
    onComplete?: () => void;
}

const Confetti = ({ show, onComplete }: ConfettiProps) => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        left: number;
        delay: number;
        duration: number;
        color: string;
    }>>([]);

    useEffect(() => {
        if (show) {
            const colors = ['#fb923c', '#fbbf24', '#f59e0b', '#f97316', '#ea580c'];
            const newParticles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 0.3,
                duration: 1.5 + Math.random() * 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => {
                onComplete?.();
            }, 2500);

            return () => clearTimeout(timer);
        } else {
            setParticles([]);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full animate-confetti"
                    style={{
                        left: `${particle.left}%`,
                        top: '-10px',
                        backgroundColor: particle.color,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
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
