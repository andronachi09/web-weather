import { ReactNode } from "react";

type ButtonProps = {
    onClick?: () => void,
    children: ReactNode;
};

export default function Button({ onClick, children }: ButtonProps) {
    return (
        <div>
            <button onClick={onClick}>
                {children}
            </button>
        </div>
    );
}
