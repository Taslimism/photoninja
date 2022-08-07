import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";

const Main = () => {
	const location = useLocation();
	const { pathname } = location;

	return <Layout searchTerm={pathname} />;
};

export default Main;
