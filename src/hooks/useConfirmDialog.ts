import { useState } from 'react';

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
