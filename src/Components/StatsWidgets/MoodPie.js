import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
	responsive: true,
	plugins: {
		title: {
			display: true,
			text: 'Pie chart of all Emotions'
		}
	}
}

function MoodPie(props) {
	let moodList = props.entries.map((entry) => entry.moods)
	let moodDict = {};
	for (const moodArr of moodList) {
		for (const mood of moodArr) {
			if (moodDict[mood]) {
				moodDict[mood] += 1;
			} else {
				moodDict[mood] = 1;
			}
		}
	}
	let dataset = [moodDict['joy'], moodDict['sadness'], moodDict['anger'], moodDict['fear'], moodDict['disgust']]

	const data = {
		labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Disgust'],
		datasets: [
			{
				label: 'Emotion Occurence',
				data: dataset,
				backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1
			}
		]
	}

	return (
		<div className='pie-chart'>
			<Pie data={data} options={options} />
		</div>
	)
}

export default MoodPie
