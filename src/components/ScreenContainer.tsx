import { useTheme } from '../context/ThemeContext';

const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
    const { isDark } = useTheme();
    
    return (
        <div className={`p-6 min-h-5/6 max-h-5/6 h-5/6 overflow-y-auto space-y-6 min-h-[56vh] max-h-[56vh] transition-colors duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-amber-50'
        }`}>
            {children}
        </div>
    );
};

export default ScreenContainer;