import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTooltips } from '../hooks/useFirstTime';

interface TooltipProps {
    id: string;
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom';
}

const Tooltip = ({ id, text, children, position = 'bottom' }: TooltipProps) => {
    const { isTooltipDismissed, dismissTooltip } = useTooltips();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!isTooltipDismissed(id)) {
            const timer = setTimeout(() => setShow(true), 800);
            return () => clearTimeout(timer);
        }
    }, [id, isTooltipDismissed]);

    const handleDismiss = () => {
        setShow(false);
        dismissTooltip(id);
    };

    return (
        <div className="relative">
            {children}
            {show && !isTooltipDismissed(id) && (
                <div
                    className={`absolute z-40 left-1/2 -translate-x-1/2 ${
                        position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
                    }`}
                >
                    <div className="rounded-xl px-4 py-3 shadow-lg max-w-[220px] bg-white border border-amber-200 dark:bg-gray-700 dark:border-gray-600">
                        <div className="flex items-start gap-2">
                            <p className="text-xs leading-relaxed flex-1 text-amber-800 dark:text-gray-200">
                                {text}
                            </p>
                            <button
                                onClick={handleDismiss}
                                className="flex-shrink-0 p-0.5 rounded-full transition-colors hover:bg-amber-100 text-amber-500 dark:hover:bg-gray-600 dark:text-gray-400"
                                aria-label="Dismiss tooltip"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    </div>
                    {/* Arrow */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-amber-200 dark:bg-gray-700 dark:border-gray-600 ${
                        position === 'top' 
                            ? 'top-full -mt-1.5 border-b border-r' 
                            : 'bottom-full -mb-1.5 border-t border-l'
                    }`} />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
