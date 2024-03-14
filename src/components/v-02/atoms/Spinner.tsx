type SpinnerProps = {
	className: string;
};

export default function Spinner({ className }: SpinnerProps) {
	return (
		<div className='flex justify-center items-center p-4'>
			<div className={className}></div>
		</div>
	);
}
