import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => {
    return (
        <button
            className={`bg-gradient-to-r from-orange-400 to-amber-400 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md hover:border-1 hover:border-amber-500 focus:ring-red-300 transition-all active:scale-[0.98] ${className || ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
