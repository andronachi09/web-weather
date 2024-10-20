import { SearchProvider } from './store/searchContext';
import MainView from './components/v-02/pages/MainView';

export default function App() {
	const apiKey: string = import.meta.env.VITE_WEATHER_API_KEY;
	const test: string = ''
	return (
		<>
			<SearchProvider apiKey={apiKey}>
				<MainView />
			</SearchProvider>
		</>
	);
}
