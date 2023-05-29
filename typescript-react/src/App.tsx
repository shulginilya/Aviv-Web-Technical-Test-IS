import Header from '@components/Header/Header';
import Listings from '@containers/Listings/Listings';
import PricesHistory from '@containers/PricesHistory/PricesHistory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<>
		<Header />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Listings />} />
				<Route path="/:id/prices" element={<PricesHistory />} />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
