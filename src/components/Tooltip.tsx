import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTooltips } from '../hooks/useFirstTime';
import { useTheme } from '../context/ThemeContext';

interface TooltipProps {
    id: string;
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom';
}

const Tooltip = ({ id, text, children, position = 'bottom' }: TooltipProps) => {
    const { isTooltipDismissed, dismissTooltip } = useTooltips();
    const { isDark } = useTheme();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!isTooltipDismissed(id)) {
            const timer = setTimeout(() => setShow(true), 800);
            return () => clearTimeout(timer);
        }
    }, [id]);

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
                    <div className={`rounded-xl px-4 py-3 shadow-lg max-w-[220px] ${
                        isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-amber-200'
                    }`}>
                        <div className="flex items-start gap-2">
                            <p className={`text-xs leading-relaxed flex-1 ${isDark ? 'text-gray-200' : 'text-amber-800'}`}>
                                {text}
                            </p>
                            <button
                                onClick={handleDismiss}
                                className={`flex-shrink-0 p-0.5 rounded-full transition-colors ${
                                    isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-amber-100 text-amber-500'
                                }`}
                                aria-label="Dismiss tooltip"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    </div>
                    {/* Arrow */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                        isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'
                    } ${position === 'top' 
                        ? 'top-full -mt-1.5 border-b border-r' 
                        : 'bottom-full -mb-1.5 border-t border-l'
                    }`} />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
