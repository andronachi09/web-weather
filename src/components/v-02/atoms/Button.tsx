import { ReactNode } from 'react';

type ButtonProps = {
	type?: 'button';
	onClick?: () => void;
	children?: ReactNode;
	className?: string;
};

export default function Button({
	onClick,
	children,
	className,
	type,
}: ButtonProps) {
	return (
		<div>
			<button onClick={onClick} className={className} type={type}>
				{children}
			</button>
		</div>
	);
}
