import { useState } from "react";
import { Focus } from "lucide-react";
import Button from "./Button";
import Typography from "./Typography";

const IntentionPrompt = () => {
    const [intention, setIntention] = useState("");
    const [isIntentionOpen, setIsIntentionOpen] = useState(false);
    const [intentionChoices, setIntentionChoices] = useState<string[]>([]);
    const [selectedChoice, setSelectedChoice] = useState("");

    const INTENTIONS = [
        "I will take one small social step today.",
        "I will be kind to myself if things feel awkward.",
        "I will listen fully in one conversation.",
        "I will greet one person with a smile.",
        "I will try one small challenge, even if it feels scary.",
        "I will celebrate a tiny win today.",
        "I will stay present for one interaction.",
        "I will ask one simple question.",
        "I will take a slow breath before I speak.",
        "I will show up, not be perfect.",
        "I will notice one kind moment.",
        "I will be gentle with my energy today.",
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
            <Button variant="icon" onClick={openModal}>
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
