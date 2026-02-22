import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

// ── Single Tab Button ──

interface TabButtonProps<T extends string> {
    id: T;
    label: string;
    isActive: boolean;
    onClick: (id: T) => void;
    variant?: "dark" | "light";
    icon?: LucideIcon;
    badge?: ReactNode;
}

function TabButton<T extends string>({
    id,
    label,
    isActive,
    onClick,
    variant = "dark",
    icon: Icon,
    badge,
}: TabButtonProps<T>) {
    const activeClass =
        variant === "dark"
            ? "bg-amber-800 text-white shadow-sm dark:bg-gray-700 dark:text-amber-300"
            : "bg-white text-amber-800 shadow-sm dark:bg-gray-700 dark:text-amber-300";

    const inactiveClass =
        variant === "dark"
            ? "bg-amber-100 text-amber-600 hover:text-amber-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
            : "text-amber-600 hover:text-amber-700 dark:text-gray-400 dark:hover:text-gray-300";

    return (
        <button
            onClick={() => onClick(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive ? activeClass : inactiveClass
            }`}
        >
            {Icon && <Icon size={14} />}
            {label}
            {badge}
        </button>
    );
}

// ── Tab Bar Container ──

export interface Tab<T extends string> {
    id: T;
    label: string;
    icon?: LucideIcon;
    badge?: ReactNode;
}

interface TabBarProps<T extends string> {
    tabs: Tab<T>[];
    activeTab: T;
    onTabChange: (tab: T) => void;
    variant?: "dark" | "light";
    className?: string;
}

function TabBar<T extends string>({
    tabs,
    activeTab,
    onTabChange,
    variant = "dark",
    className = "",
}: TabBarProps<T>) {
    return (
        <div
            className={`flex rounded-xl p-1 gap-1 bg-amber-100 dark:bg-gray-800 ${className}`}
        >
            {tabs.map((tab) => (
                <TabButton
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={onTabChange}
                    variant={variant}
                    icon={tab.icon}
                    badge={tab.badge}
                />
            ))}
        </div>
    );
}

export default TabBar;
