import Button from './Button';

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
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onCancel}
            />
            
            {/* Dialog */}
            <div className="relative max-w-xs w-full rounded-2xl p-6 shadow-xl bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="text-sm mb-6 text-gray-600 dark:text-gray-300">
                    {message}
                </p>
                
                <div className="flex gap-3">
                    <Button
                        onClick={onCancel}
                        variant="cancel"
                        size="md"
                        className="flex-1"
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        size="md"
                        className="flex-1"
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
