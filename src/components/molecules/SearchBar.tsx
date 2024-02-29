import { ChangeEvent, useState } from "react";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";

type SearchBarProps = {
    onSearch: (searchText: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [inputText, setInputText] = useState<string>('');

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSearch = () => {
        onSearch(inputText);
    };

    return (
        <div>
            <InputField type="search" onChange={onHandleChange} placeholder="search for location" />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
}
