import { SearchProvider } from './store/searchContext';
import MainView from './components/v-02/pages/MainView';

export default function App() {
	return (
		<SearchProvider>
			<MainView />
		</SearchProvider>
	);
}
