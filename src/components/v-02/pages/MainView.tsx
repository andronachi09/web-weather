import Header from '../templates/Header';

export default function MainView() {
	return (
		<div className='w-full h-screen bg-[#1E1F24]'>
			<div className='max-w-[1240px] w-full h-full mx-auto flex flex-col pt-4'>
				<Header />
			</div>
		</div>
	);
}
