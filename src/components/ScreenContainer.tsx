const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-6 pb-24 min-h-3/4 max-h-3/4 h-3/4 overflow-y-auto space-y-6 bg-amber-50 min-h-[50vh] max-h-[50vh]">
            {children}
        </div>
    );
};

export default ScreenContainer;