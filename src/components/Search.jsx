import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import { ThreeDots } from "react-loader-spinner";
import useSearchStore from "../store/search.store";
import photo from "../assets/photos.png";
import collection from "../assets/collection.png";
import users from "../assets/users.png";
import downArrow from "../assets/down-arrow.png";

const Search = () => {
	const searchTerm = useSearchStore((state) => state.searchTerm);
	const [showOptions, setShowOptions] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const [error, setError] = useState(false);
	const [orientation, setOrientation] = useState("");
	const [showCarousel, setShowCarousel] = useState(false);
	const [index, setIndex] = useState(0);

	const handlePhotoClick = (index) => {
		setIndex(index);
		setShowCarousel(true);
	};

	useEffect(() => {
		setPhotos([]);
		setActivePage(1);
		setTotalPage(0);
	}, [searchTerm, orientation]);

	useEffect(() => {
		if (activePage < totalPage) {
			setHasMore(true);
		} else {
			setHasMore(false);
		}
	}, [totalPage, activePage]);

	const { observe } = useInView({
		onEnter: ({ unobserve, observe }) => {
			unobserve();
			if (hasMore) {
				setActivePage((page) => page + 1);
				observe();
			}
		},
	});

	useEffect(() => {
		let cancel;
		setIsLoading(true);
		setError(false);
		(async () => {
			let orient;
			if (orientation) {
				orient = `&orientation=${orientation}`;
			} else {
				orient = "/";
			}
			try {
				const { data } = await axios.get(
					`https://api.unsplash.com/search/photos?query=${searchTerm}&page=${activePage}&${orient}`,
					{
						headers: {
							Authorization: `Client-ID pXkDJDFbkPrQ8KFEwR7fASn2JIMlld7_4-dofy1XcMk`,
						},
						cancelToken: new axios.CancelToken((c) => (cancel = c)),
					}
				);
				setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
				setTotalPage(data.total_pages);
			} catch (e) {
				if (axios.isCancel(e)) return;
				setError(true);
			}
		})();

		return () => cancel();
	}, [searchTerm, activePage, orientation]);

	return (
		<div onClick={() => setShowOptions(false)}>
			<div className='flex p-4 mt-20 border-b pb-3 justify-between '>
				<div className='flex gap-4'>
					<div className='flex gap-2 items-center cursor-pointer after:content-[""] after:w-20 after:mt-12 after:absolute after:h-0.5 after:bg-black'>
						<img className='h-4' src={photo} alt='photos' />
						<span>Photos</span>
					</div>
					<div className='flex gap-2 items-center'>
						<img className='h-4' src={collection} alt='collection' />
						<span>Collections</span>
					</div>
					<div className='flex gap-2 items-center'>
						<img className='h-4' src={users} alt='users' />
						<span>Users</span>
					</div>
				</div>
				<div className='relative'>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setShowOptions(!showOptions);
						}}
						className='flex items-center'
						type='button'>
						<span>Any Orientation</span>
						<img className='h-4 ml-2' src={downArrow} alt='downArrow' />
					</button>
					{showOptions && (
						<div className='absolute bg-white border rounded-md shadow-md flex flex-col py-4 px-3 -translate-x-1/4 mt-2 pr-12 gap-4 items-start'>
							<button
								onClick={(e) => setOrientation(e.target.value)}
								className='flex-none'
								type='button'
								value='landscape'>
								Landscape
							</button>
							<button
								onClick={(e) => {
									console.log(e.target.value);
									setOrientation(e.target.value);
								}}
								className='flex-none'
								type='button'
								value='portrait'>
								Portrait
							</button>
							<button
								onClick={(e) => setOrientation(e.target.value)}
								className='flex-none'
								type='button'
								value='squarish'>
								Squarish
							</button>
						</div>
					)}
				</div>
			</div>
			<div className='columns-1 sm:columns-2 md:columns-3 gap-4 mt-24 px-8 mb-24'>
				{photos &&
					photos.length > 0 &&
					photos.map((photo, index) => (
						<img
							onClick={() => handlePhotoClick(index)}
							ref={index === photos.length - 1 ? observe : null}
							key={photo.id}
							className=' cursor-pointer roundex-sm mb-4'
							src={photo.urls.regular}
							alt={photo.alt_description}
						/>
					))}
			</div>
			{showCarousel && (
				<Carousel photos={photos} index={index} setIndex={setIndex} />
			)}

			{isLoading && (
				<div className='flex justify-center'>
					<ThreeDots color='black' height={80} width={80} />
				</div>
			)}
			{error && <div>An error aoccured</div>}
		</div>
	);
};

export default Search;
