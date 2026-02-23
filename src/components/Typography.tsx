import React from "react";

type TypographyVariant =
    | "display"
    | "title"
    | "headline"
    | "subtitle"
    | "label"
    | "body"
    | "body-sm"
    | "caption"
    | "micro"
    | "overline";

type TypographyTone =
    | "neutral"
    | "primary"
    | "primary-soft"
    | "warm"
    | "subtle"
    | "accent"
    | "accent-soft"
    | "muted"
    | "info"
    | "info-strong"
    | "success";

type TypographyProps<T extends React.ElementType> = {
    as?: T;
    variant?: TypographyVariant;
    tone?: TypographyTone;
    className?: string;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "color">;

const variantStyles: Record<TypographyVariant, string> = {
    display: "text-3xl sm:text-4xl font-bold tracking-tight",
    title: "text-2xl font-bold tracking-tight",
    headline: "text-xl font-semibold",
    subtitle: "text-lg font-semibold",
    label: "text-sm font-semibold",
    body: "text-base leading-relaxed",
    "body-sm": "text-sm leading-relaxed",
    caption: "text-xs",
    micro: "text-[10px] leading-tight",
    overline: "text-xs font-semibold uppercase tracking-wide",
};

const toneStyles: Record<TypographyTone, string> = {
    neutral: "text-gray-900 dark:text-gray-100",
    primary: "text-amber-900 dark:text-gray-100",
    "primary-soft": "text-amber-800 dark:text-amber-200",
    warm: "text-amber-700 dark:text-amber-400",
    subtle: "text-amber-700 dark:text-gray-300",
    accent: "text-amber-600 dark:text-amber-400",
    "accent-soft": "text-amber-500 dark:text-gray-400",
    muted: "text-gray-500 dark:text-gray-400",
    info: "text-sky-600 dark:text-sky-400",
    "info-strong": "text-sky-800 dark:text-sky-200",
    success: "text-green-600 dark:text-green-400",
};

const defaultToneByVariant: Record<TypographyVariant, TypographyTone> = {
    display: "primary",
    title: "primary",
    headline: "primary",
    subtitle: "primary",
    label: "primary",
    body: "subtle",
    "body-sm": "subtle",
    caption: "muted",
    micro: "muted",
    overline: "accent",
};

const defaultElementByVariant: Record<TypographyVariant, React.ElementType> = {
    display: "h1",
    title: "h2",
    headline: "h3",
    subtitle: "h3",
    label: "p",
    body: "p",
    "body-sm": "p",
    caption: "p",
    micro: "p",
    overline: "span",
};

const Typography = <T extends React.ElementType = "p">({
    as,
    variant = "body",
    tone,
    className,
    children,
    ...props
}: TypographyProps<T>) => {
    const Component = (as || defaultElementByVariant[variant]) as React.ElementType;
    const appliedTone = tone ?? defaultToneByVariant[variant];
    const classes = [
        variantStyles[variant],
        toneStyles[appliedTone],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};

export default Typography;
