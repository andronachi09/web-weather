import { ChangeEvent, useEffect, useState } from "react";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import { validateAndSanitizeSearchInput } from "../../../utils/validateSearchInput";
import ErrorMessage from "../atoms/ErrorMessage";

type SearchBarProps = {
    onSearch: (searchText: string) => void,
    className: string,
    onError?: string;
};

export default function SearchBar({ onSearch, className, onError }: SearchBarProps) {
    const [inputText, setInputText] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (onError) {
            setError(onError);
        }
    }, [onError]);

    const handleSearch = () => {
        const { isValid, message } = validateAndSanitizeSearchInput(inputText);

        if (!isValid) {
            setError(message);
            return;
        }

        setError('');
        onSearch(message);
        setError(onError!);
    };

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
        if (error) setError(''); //clear error message when user starts typing
    };

    return (
        <div>
            <div className={className}>
                <InputField
                    type="search"
                    value={inputText}
                    placeholder="search for location"
                    className="w-full h-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none"
                    onChange={onHandleChange}
                >
                </InputField>
                <Button
                    onClick={handleSearch}
                    className='w-full m-2 rounded bg-teal-800 px-4 py-1 text-white'
                >search</Button>
            </div>
            <div className= "py-1 pl-2">
                <ErrorMessage error={error} />
            </div>
        </div>
    );
}
