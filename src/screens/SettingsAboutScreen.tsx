import ScreenContainer from "../components/ScreenContainer";
import { Heart } from "lucide-react";

const SettingsAboutScreen = () => {
    return (
        <ScreenContainer>
            <div className="space-y-4">
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    This app builds social confidence gently, one small step at a time.
                    Try a daily challenge, explore practices, check in on your mood,
                    and keep quick notes that help you reflect and grow.
                </p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    Your progress is meant to feel kind and achievable. Focus on showing up,
                    not perfection.
                </p>
                <div className="rounded-lg p-3 border bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/60">
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                        <Heart size={12} className="inline text-blue-400 fill-blue-400 mr-0.5" />
                        Remember: progress isn’t linear. Rest and reflection are part of the journey.
                    </p>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default SettingsAboutScreen;