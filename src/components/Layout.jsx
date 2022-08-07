import { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import Carousel from "./Carousel";

const fetchPhotos = async (searchTerm, page) => {
	if (searchTerm === "/") {
		searchTerm = "random";
	} else {
		searchTerm = decodeURIComponent(searchTerm.substring(1));
		console.log(searchTerm);
	}

	const { data } = await axios.get(
		`https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}`,
		{
			headers: {
				Authorization: `Client-ID pXkDJDFbkPrQ8KFEwR7fASn2JIMlld7_4-dofy1XcMk`,
			},
		}
	);

	return data;
};

const Layout = ({ searchTerm }) => {
	const [photos, setPhotos] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const [error, setError] = useState(false);
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
	}, [searchTerm]);

	useEffect(() => {
		if (activePage < totalPage) {
			setHasMore(true);
		} else {
			setHasMore(false);
		}
	}, [totalPage, activePage]);

	useEffect(() => {
		setIsLoading(true);
		try {
			(async () => {
				const results = await fetchPhotos(searchTerm, activePage);
				setTotalPage(results.total_pages);
				setPhotos((prevPhotos) => [...prevPhotos, ...results.results]);
				setIsLoading(false);
			})();
		} catch (err) {
			setError(true);
		}
	}, [searchTerm, activePage]);

	const { observe } = useInView({
		onEnter: ({ unobserve, observe }) => {
			unobserve();
			if (hasMore) {
				setActivePage((page) => page + 1);
				observe();
			}
		},
	});

	return (
		<div onClick={() => setShowCarousel(false)}>
			<div className='columns-1 sm:columns-2 md:columns-3 gap-4 mt-24 px-8 mb-24'>
				{photos &&
					photos.length > 0 &&
					photos.map((photo, index) => (
						<img
							onClick={(e) => {
								e.stopPropagation();
								handlePhotoClick(index);
							}}
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

export default Layout;
