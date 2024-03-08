import { ChangeEventHandler, ReactNode } from "react"

type InputFieldProps = {
    type: string,
    value?: string,
    placeholder?: string,
    className?: string,
    children?: ReactNode,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onFocus?: ChangeEventHandler<HTMLInputElement>;
};

export default function InputField({
    type,
    value,
    placeholder,
    className,
    children,
    onChange,
    onFocus
}: InputFieldProps) {
    return (
        <div>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                className={className}
                children={children}
                onChange={onChange}
                onFocus={onFocus}
            />
        </div>
    );
}
