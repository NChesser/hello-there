import React from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "cancel"
    | "danger"
    | "danger-outline"
    | "ghost"
    | "text"
    | "success";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-sm hover:shadow-md",
    secondary:
        "border border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-gray-600 dark:text-amber-400 dark:hover:bg-gray-700",
    cancel:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    "danger-outline":
        "border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30",
    ghost:
        "border text-amber-600 hover:bg-amber-100 dark:border-gray-600 dark:text-amber-400 dark:hover:bg-gray-700",
    text:
        "border text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
    success:
        "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-sm hover:shadow-md",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "w-full py-3",
};

const Button = ({
    variant = "primary",
    size = "md",
    children,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
