const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-6 min-h-5/6 max-h-5/6 h-5/6 overflow-y-auto space-y-6 bg-amber-50 min-h-[56vh] max-h-[56vh]">
            {children}
        </div>
    );
};

export default ScreenContainer;