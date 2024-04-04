import SearchBar from '../organisms/SearchBar';import { getDate } from '../../../utils/getDate';

export default function Header() {
	const date = getDate();

	return (
		<div className='bg-[#2E2E38] flex flex-col justify-items-center p-6 rounded-xl md:flex md:flex-row md:justify-between'>
			<h1 className='flex justify-center text-2xl text-gray-200 m-2'>
				{date}
			</h1>
			<SearchBar />
		</div>
	);
}
