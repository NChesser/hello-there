import { useCallback, useState } from 'react';

const useNavigationContext = () => {
    const [currentPage, setCurrentPage] = useState<string>('/');
    const [history, setHistory] = useState<string[]>(['/']);

    const navigate = useCallback((path: string) => {
        setCurrentPage(path);
        setHistory((prev) => [...prev, path]);
    }, []);

    const goBack = useCallback(() => {
        setHistory((prev) => {
            if (prev.length > 1) {
                const newHistory = prev.slice(0, -1);
                setCurrentPage(newHistory[newHistory.length - 1]);
                return newHistory;
            }
            return prev;
        });
    }, []);

    const reset = useCallback(() => {
        setCurrentPage('/');
        setHistory(['/']);
    }, []);

    const setCurrentView = useCallback((view: string) => {
        setCurrentPage(view);
        setHistory((prev) => [...prev, view]);
    }, []);

    return {
        setCurrentView,
        currentPage,
        history,
        navigate,
        goBack,
        reset,
    };
};


export default useNavigationContext;


