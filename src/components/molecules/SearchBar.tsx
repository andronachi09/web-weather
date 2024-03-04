import { ChangeEvent, useState } from "react";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";

type SearchBarProps = {
    onSearch: (searchText: string) => void,
    className: string;
};

export default function SearchBar({ onSearch, className }: SearchBarProps) {
    const [inputText, setInputText] = useState<string>('');

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSearch = () => {
        onSearch(inputText);
    };

    const handleClear = () => {
        onSearch('');
        setInputText('');
    };

    return (
        <div className={className}>
            <InputField
                type="search"
                value={inputText}
                placeholder="search for location"
                className="w-full h-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none"
                onChange={onHandleChange}
                onFocus={handleClear}
            >
            </InputField>
            <Button
                onClick={handleSearch}
                className='w-full m-2 rounded bg-teal-800 px-4 py-1 text-white'
            >search</Button>
        </div>
    );
}
