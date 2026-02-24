import React from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "cancel"
    | "danger"
    | "danger-outline"
    | "ghost"
    | "text"
    | "success"
    | "save"
    | "icon";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "border bg-amber-500 text-amber-50 hover:bg-amber-600 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-500",
    secondary:
        "border border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-gray-600 dark:text-amber-400 dark:hover:bg-gray-700",
    cancel: "border border-amber-200 text-amber-700 hover:bg-amber-600 hover:text-white dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-500",
    danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    "danger-outline":
        "border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30",
    ghost: "border text-amber-600 hover:bg-amber-100 dark:border-gray-600 dark:text-amber-400 dark:hover:bg-gray-700",
    text: "border text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
    success:
        "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-sm hover:shadow-md",
    save: "border bg-amber-500 text-amber-50 hover:bg-amber-600 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-500",
    icon: "rounded-full border-2 border-amber-200 text-amber-600 hover:bg-amber-100 dark:border-gray-600 dark:text-amber-400 dark:hover:bg-gray-700 hover:border-amber-400 focus:ring-1 focus:ring-amber-400 dark:border-gray-700 dark:hover:border-gray-500 dark:focus:ring-gray-500",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-2 font-semibold",
    md: "text-sm px-4 py-2",
    lg: "w-full py-3",
    xl: "p-3 text-lg",
};

const Button = ({
    variant = "primary",
    size = "md",
    children = null,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
