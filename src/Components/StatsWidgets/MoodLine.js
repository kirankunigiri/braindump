import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import Backend from '../../Backend'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
	tension: 0.3,
	responsive: true,
	plugins: {
		legend: {
			position: 'top'
		},
		title: {
			display: true,
			text: 'Mood Scores for This Week'
		}
	},
	scales: {
		y: {
			min: 0,
			max: 5,
			ticks: {
				stepSize: 1
			}
		}
	}
}

function MoodLine(props) {
	let recentEntries = props.entries.slice(0, 7).reverse()
	let recentDates = recentEntries.map((e) => Backend.timestampToDate(e.date))
	recentDates = recentDates.map((d) => d.toLocaleString('en-us', { month: 'short', day: 'numeric' }))

	const data = {
		labels: recentDates,
		datasets: [
			{
				label: 'Mood Scores',
				data: recentEntries.map((entry) => entry.score),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)'
			}
		]
	}

	return <div className='line-chart'> <Line options={options} data={data} /></div>
}

export default MoodLine
