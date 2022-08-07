import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Search from "./pages/Search";

const App = () => (
	<Router>
		<Routes>
			<Route path='/' element={<Home />}>
				<Route path='' element={<Main />} />
				<Route path='wallpapers' element={<Main />} />
				<Route path='experimental' element={<Main />} />
				<Route path='architecture' element={<Main />} />
				<Route path='nature' element={<Main />} />
				<Route path='business and work' element={<Main />} />
				<Route path='fashion' element={<Main />} />
				<Route path='film' element={<Main />} />
				<Route path='food' element={<Main />} />
				<Route path='drink' element={<Main />} />
				<Route path='people' element={<Main />} />
				<Route path='interiors' element={<Main />} />
				<Route path='traveller' element={<Main />} />
				<Route path='animals' element={<Main />} />
				<Route path='spirituality' element={<Main />} />
				<Route path='history' element={<Main />} />
				<Route path='athletics' element={<Main />} />
				<Route path='search' element={<Search />} />
			</Route>
		</Routes>
	</Router>
);

export default App;
