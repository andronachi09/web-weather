import { ChangeEventHandler } from "react"

type InputFieldProps = {
    type: string,
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    className: string;
};

export default function InputField({ type, placeholder, onChange, className }: InputFieldProps) {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
            />
        </div>
    );
}
