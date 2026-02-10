import { useState, useEffect, type ReactNode } from 'react';

interface ScreenTransitionProps {
    children: ReactNode;
    screenKey: string;
}

const ScreenTransition = ({ children, screenKey }: ScreenTransitionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [displayedKey, setDisplayedKey] = useState(screenKey);
    const [displayedChildren, setDisplayedChildren] = useState(children);

    useEffect(() => {
        if (screenKey !== displayedKey) {
            // Fade out
            setIsVisible(false);
            const timeout = setTimeout(() => {
                setDisplayedKey(screenKey);
                setDisplayedChildren(children);
                // Fade in
                requestAnimationFrame(() => setIsVisible(true));
            }, 150);
            return () => clearTimeout(timeout);
        } else {
            setDisplayedChildren(children);
        }
    }, [screenKey, children, displayedKey]);

    // Initial fade in
    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    return (
        <div
            className="transition-all duration-200 ease-out"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            }}
        >
            {displayedChildren}
        </div>
    );
};

export default ScreenTransition;
