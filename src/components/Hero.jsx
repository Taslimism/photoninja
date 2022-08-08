import axios from "axios";
import { useEffect, useState } from "react";

const fetchHeroPhoto = async (searchTerm) => {
	if (searchTerm === "/") {
		searchTerm = "random";
	} else {
		searchTerm = searchTerm.substring(1);
	}

	const { data } = await axios.get(
		`https://api.unsplash.com/photos/random/?ar=18:8&fit=crop&query=${searchTerm}`,
		{
			headers: {
				Authorization: `Client-ID pXkDJDFbkPrQ8KFEwR7fASn2JIMlld7_4-dofy1XcMk`,
			},
		}
	);
	return data;
};

const Hero = ({ searchTerm }) => {
	const [heroImage, setHeroImage] = useState();

	useEffect(() => {
		(async () => {
			const {
				urls: { regular },
			} = await fetchHeroPhoto(searchTerm);

			setHeroImage(regular);
		})();
	}, [searchTerm]);

	return (
		<div className='relative'>
			{heroImage && (
				<img
					className='w-full h-[700px] object-cover relative'
					src={heroImage}
					alt='random'
				/>
			)}
			<div className='absolute z-0 mx-[50%] top-[50%] -translate-x-1/2 w-[50%] flex flex-col gap-2 text-white'>
				<h1 className='text-3xl'>Unsplash</h1>
				<div>
					<p>The internet's source of freely-usable images.</p>
					<p>Powered by creator's everywhere</p>
				</div>
			</div>
		</div>
	);
};

export default Hero;
