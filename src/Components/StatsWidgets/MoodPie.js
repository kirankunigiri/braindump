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

	console.log(Object.entries(moodCounts));
	const mapped = Object.entries(moodCounts).map((mood) => (
		{title: mood[0], label: mood[0], value: mood[1], color: Backend.colorFromMood[parseInt(mood[0]-1)]}
	))
	console.log(mapped);

	return (
		<div className="widget-xl mood-pie">
			<h1>Mood Pie</h1>
			<PieChart
				data={mapped}
			/>
		</div>
	)
}

export default MoodPie;