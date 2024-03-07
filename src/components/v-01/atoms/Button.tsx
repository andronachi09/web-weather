import { ReactNode } from "react";

type ButtonProps = {
    onClick?: () => void,
    children: ReactNode,
    className?: string;
};

export default function Button({ onClick, children, className }: ButtonProps) {
    return (
        <div>
            <button
                onClick={onClick}
                className={className}
            >
                {children}
            </button>
        </div>
    );
}
