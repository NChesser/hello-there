import React from "react";

type CardVariant = "base" | "soft" | "elevated" | "outline";

type CardProps = {
    children: React.ReactNode;
    className?: string;
    variant?: CardVariant;
} & React.HTMLAttributes<HTMLDivElement>;

const variantStyles: Record<CardVariant, string> = {
    base: "border bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700",
    soft: "border bg-amber-50/70 border-amber-200 dark:bg-gray-800 dark:border-gray-700",
    elevated:
        "border-2 shadow-md bg-gradient-to-br from-white to-amber-50 border-amber-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600",
    outline: "border-2 bg-transparent border-amber-200 dark:border-gray-600",
};

const Card = ({
    children,
    className,
    variant = "base",
    ...props
}: CardProps) => {
    return (
        <div
            className={`rounded-2xl p-6 ${variantStyles[variant]} ${
                className || ""
            }`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
