import { useState } from "react";

// Components
import Button from "./Button";
import Typography from "./Typography";

// Icons
import { Focus } from "lucide-react";


const IntentionPrompt = () => {
    const [intention, setIntention] = useState("");
    const [isIntentionOpen, setIsIntentionOpen] = useState(false);
    const [intentionChoices, setIntentionChoices] = useState<string[]>([]);
    const [selectedChoice, setSelectedChoice] = useState("");

    const INTENTIONS = [
        "I will approach today with curiosity.",
        "I will embrace challenges as opportunities.",
        "I will practice gratitude for small moments.",
        "I will focus on progress, not perfection.",
        "I will be patient with myself and others.",
        "I will cultivate a positive outlook.",
        "I will let go of what I can't control.",
        "I will trust my ability to handle what comes.",
        "I will be open to learning something new.",
        "I will treat myself and others with compassion.",
        "I will stay present and mindful throughout the day.",
        "I will celebrate growth, no matter how small.",
    ];

    const getRandomIntentions = (count: number) => {
        const shuffled = [...INTENTIONS].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const openModal = () => {
        const nextChoices = getRandomIntentions(3);
        setIntentionChoices(nextChoices);
        setSelectedChoice(nextChoices.includes(intention) ? intention : "");
        setIsIntentionOpen(true);
    };

    const closeModal = () => {
        setIsIntentionOpen(false);
    };

    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newChoice = event.currentTarget.textContent || "";

        setSelectedChoice(newChoice);

        if (newChoice) {
            setIntention(newChoice);
        }
        setIsIntentionOpen(false);
    };

    return (
        <>
            <Button
                variant="icon"
                onClick={openModal}
                className={
                    selectedChoice
                        ? "text-amber-400 dark:text-gray-500"
                        : "border-dotted text-amber-400 dark:text-gray-500"
                }
            >
                <Focus />
            </Button>

            {isIntentionOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        aria-label="Close intention"
                        onClick={closeModal}
                    />
                    <div
                        className="relative w-full max-w-sm rounded-2xl border p-5 shadow-xl bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700"
                        style={{ animation: "slideUp 0.25s ease-out" }}
                    >
                        <Typography as="h3" variant="subtitle">
                            Today's Intention
                        </Typography>
                        <Typography variant="caption" className="mt-1">
                            Pick one to carry with you today.
                        </Typography>
                        <div className="mt-3 space-y-2">
                            {intentionChoices.map((option) => (
                                <Button
                                    key={option}
                                    type="button"
                                    variant="secondary"
                                    className={`w-full justify-start text-left ${
                                        selectedChoice === option
                                            ? "border-amber-400 bg-amber-50 dark:bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={handleSave}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Slide-up animation */}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default IntentionPrompt;
