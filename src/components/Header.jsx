import { Link, useLocation, useNavigate } from "react-router-dom";
import search from "../assets/search.png";
import lens from "../assets/lens.png";
import logo from "../assets/logo/logo.jpg";
import hamburger from "../assets/hamburger.png";
import notification from "../assets/notification.png";
import user from "../assets/user.png";
import useSearchStore from "../store/search.store";

const routes = [
	"Wallpapers",
	"Experimental",
	"Architecture",
	"Nature",
	"Fashion",
	"Film",
	"Food",
	"Drink",
	"People",
	"Interiors",
	"Traveller",
	"Animals",
	"Spirituality",
	"History",
	"Athletics",
];

const Header = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { searchTerm, setSearchTerm, clearSearchTerm } = useSearchStore(
		(state) => ({
			searchTerm: state.searchTerm,
			setSearchTerm: state.setSearchTerm,
			clearSearchTerm: state.clearSearchTerm,
		})
	);

	const handleSearch = (e) => {
		if (e.keyCode === 13) navigate("/search");
	};

	return (
		<>
			<div className='h-20 text-gray-400 flex items-center bg-white justify-between px-4 pt-1 gap-1 sm:gap-2 w-full fixed  top-0 z-10 '>
				<Link to='/'>
					<img
						onClick={clearSearchTerm}
						src={logo}
						alt='logo'
						className='h-8'
					/>
				</Link>
				<div className='flex mx-1 sm:mx-4 justify-between items-center grow gap-1 sm:gap-3  border rounded-full bg-slate-200 p-1 px-1 sm:px-4'>
					<img
						className='w-4 h-4'
						src={search}
						alt='search'
						height='15px'
						width='15px'
					/>
					<input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={(e) => handleSearch(e)}
						className='grow focus:outline-none bg-transparent'
						type='text'
						placeholder='Search for free high-resolution photos'
					/>
					<img src={lens} alt='search' height='15px' width='15px' />
				</div>
				<div className='flex gap-2 sm:gap-4 items-center '>
					<div className='hidden sm:flex sm:gap-2 sm:items-center'>
						<span>Blog</span>
						<span className='border p-1 md:text-normal text-sm '>
							Submit a photo
						</span>

						<img className='h-6' src={notification} alt='bell' />
					</div>
					<img className='h-6' src={user} alt='profile' />
					<img className='h-6' src={hamburger} alt='three lines' />
				</div>
			</div>
			{pathname !== "/search" && (
				<div className='flex  pt-2 border-b-2 pb-4 w-full fixed bg-white top-20 z-10'>
					<div className='flex gap-2 sm:gap-4 px-4 sm:px-8 border-r-2'>
						<Link to='/'>
							<button onClick={clearSearchTerm}>Editorial</button>
						</Link>
						<button>Following</button>
					</div>
					<div className='flex gap-2 flex-auto overflow-scroll items-center md:gap-8 no-scrollbar px-4 sm:gap-2'>
						{routes.map((route) => (
							<Link
								key={route}
								className='text-black decoration-none flex-none'
								to={"/" + route.toLowerCase()}>
								<button onClick={clearSearchTerm} className='flex-none'>
									{route}
								</button>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
