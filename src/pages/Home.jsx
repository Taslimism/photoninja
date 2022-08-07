import Header from "../components/Header";
import Hero from "../components/Hero";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
	const { pathname, search } = useLocation();

	return (
		<>
			<Header searchTerm={search?.substring(2)} />
			{pathname !== "/search" && <Hero searchTerm={location.pathname} />}
			<Outlet />
		</>
	);
};

export default Home;
