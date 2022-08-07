import left from "../assets/left.png";
import next from "../assets/next.png";

const Carousel = ({ photos, index, setIndex }) => {
	const handlePrev = () => {
		if (index === 0) return;
		setIndex((prev) => prev - 1);
	};
	const handleNext = () => {
		if (index === photos.length - 1) return;
		setIndex((prev) => prev + 1);
	};
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className='fixed overflow-scroll no-scrollbar flex items-center gap-y-2  bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] z-50 shadow-2xl rounded-md py-8'>
			<button
				className='disabled:cursor-not-allowed'
				disabled={index === 0}
				onClick={handlePrev}
				type='button'>
				<img className='h-10' src={left} alt='prev' />
			</button>
			<img
				key={photos[index].id}
				className='object-contain w-[90%]'
				src={photos[index].urls.regular}
				alt='photos'
			/>
			<button
				className='disabled:cursor-not-allowed'
				disabled={index === photos.length - 1}
				onClick={handleNext}
				type='button'>
				<img className='h-10' src={next} alt='prev' />
			</button>
		</div>
	);
};

export default Carousel;
