type ErrorMessageProps = {
	error: string;
};

export default function ErrorMessage({ error }: ErrorMessageProps) {
	if (!error) return null;

	return <div className='text-red-500 text-base my-2 px-4'>{error}</div>;
}
