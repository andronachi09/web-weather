type ErrorMessageProps = {
    error: string;
};

export default function ErrorMessage({ error }: ErrorMessageProps) {
    if (!error) return null;

    return (
        <div className="text-red-500 text-sm mt-2">
            {error}
        </div>
    );
}
