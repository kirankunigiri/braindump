import Backend from '../../Backend';

function YearGrid(props) {

	const dayOfYear = date => {
		const year = date.getFullYear();
		const firstJan = new Date(year, 0, 1);
		const differenceInMillieSeconds = date - firstJan;
		return (differenceInMillieSeconds / (1000 * 60 * 60 * 24) + 1);
	};

	var pixels = [...Array(365)].fill("#dbdbdb");
	for (let entry of props.entries) {
		const date = Backend.timestampToDate(entry.date)
		if (date.getFullYear() === new Date().getFullYear()) {
			const index = dayOfYear(date)
			pixels[index] = Backend.colorFromMood[entry.mood-1]
		}
	}

	return (
		<div className='widget-xl'>
			<h1>Year in Pixels</h1>
			<div className='yearGrid'>
				{pixels.map((pixel, index) => (
					<div className='pixel' key={index} style={{backgroundColor: pixel}}>
						{index+1}
					</div>
				))}
			</div>
		</div>
	);
}

export default YearGrid;