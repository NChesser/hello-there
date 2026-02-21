const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-6 min-h-5/6 max-h-5/6 h-5/6 overflow-y-auto space-y-6 min-h-[56vh] max-h-[56vh] transition-colors duration-300 bg-amber-50 dark:bg-gray-900">
            {children}
        </div>
    );
};

export default ScreenContainer;