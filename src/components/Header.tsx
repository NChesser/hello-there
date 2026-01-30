
interface HeaderProps {
    title?: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <div className="bg-gradient-to-r from-orange-200 to-amber-200 p-4 rounded-t-3xl shadow-sm">
            <div className="flex items-center justify-between px-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                    🐨
                </div>
                <h3 className="text-xl font-semibold text-amber-900 -ml-6">
                    {capitalizeFirstLetter(title || "Home")}
                </h3>
                <div className="w-6 h-6" /> {/* Placeholder for alignment */}
            </div>
        </div>
    );
};

export default Header;

const capitalizeFirstLetter = (text: string) => {
    if (text.length === 0) return text;

    return text.charAt(0).toUpperCase() + text.slice(1);
};


