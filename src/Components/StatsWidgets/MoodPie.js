import { PieChart } from 'react-minimal-pie-chart';
import Backend from '../../Backend';

function MoodPie(props) {

	var moodCounts = {}
	for (let entry of props.entries) {
		if (moodCounts[entry.mood]) {
			moodCounts[entry.mood] += 1
		} else {
			moodCounts[entry.mood] = 1
		}
	}

	// console.log(Object.entries(moodCounts));
	// const mapped = Object.entries(moodCounts).map((mood) => (
	// 	{title: mood[0], label: mood[0], value: mood[1], color: Backend.colorFromMood[parseInt(mood[0]-1)]}
	// ))
	// console.log(mapped);

	let moodData = [
		{title: 'Joy', label: 'Joy', value: 10, color: 'orange'},
		{title: 'Sad', label: 'Sad', value: 3, color: 'purple'},
		{title: 'Anger', label: 'Anger', value: 1, color: 'red'},
		{title: 'Fear', label: 'Fear', value: 2, color: 'blue'},
	]

	const defaultLabelStyle = {
		fontSize: '5px',
		fontFamily: 'sans-serif',
	  };

	return (
		<div className="widget-xl mood-pie">
			<h1>Overall Mood Chart</h1>
			<PieChart
				data={moodData}
				label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          ...defaultLabelStyle,
        }}
			/>
		</div>
	)
}

export default MoodPie;