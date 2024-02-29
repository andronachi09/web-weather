import { ChangeEventHandler } from "react"

type InputFieldProps = {
    type: string,
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
};

export default function InputField({ type, placeholder, onChange }: InputFieldProps) {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}
