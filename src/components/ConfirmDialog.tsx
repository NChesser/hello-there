import { useState, type ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'default';
}

const ConfirmDialog = ({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'default',
}: ConfirmDialogProps) => {
    const { isDark } = useTheme();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onCancel}
            />
            
            {/* Dialog */}
            <div className={`relative max-w-xs w-full rounded-2xl p-6 shadow-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {title}
                </h3>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {message}
                </p>
                
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isDark 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-colors ${
                            variant === 'danger'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-gradient-to-r from-orange-400 to-amber-400 hover:shadow-md'
                        }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;

// Hook for easy confirm dialog usage
export const useConfirmDialog = () => {
    const [state, setState] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        confirmLabel?: string;
        variant?: 'danger' | 'default';
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => {},
    });

    const confirm = (options: {
        title: string;
        message: string;
        confirmLabel?: string;
        variant?: 'danger' | 'default';
    }): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                ...options,
                isOpen: true,
                onConfirm: () => {
                    setState(s => ({ ...s, isOpen: false }));
                    resolve(true);
                },
            });
        });
    };

    const cancel = () => {
        setState(s => ({ ...s, isOpen: false }));
    };

    const dialogProps = {
        ...state,
        onCancel: cancel,
    };

    return { confirm, dialogProps };
};
