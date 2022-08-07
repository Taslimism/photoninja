import Header from "../components/Header";
import SearchComponent from "../components/Search";
import { useLocation } from "react-router-dom";

const Search = () => {
	const { pathname } = useLocation();
	return (
		<>
			<Header />
			<SearchComponent />
		</>
	);
};

export default Search;
