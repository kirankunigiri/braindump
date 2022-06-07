import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { query, orderBy, collection, addDoc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

ChartJS.register(ArcElement, Tooltip, Legend)

function ActivityPies(props) {
	let moodList = props.entries.map((entry) => entry.moods)
	let activityDict = {}

	const tagsCollection = collection(useFirestore(), 'journals', props.uid, 'tags')
	const tagsQuery = query(tagsCollection, orderBy('name', 'desc'))
	const { data: allTags } = useFirestoreCollectionData(tagsQuery, {
		idField: 'id'
	})

	if (!allTags) {
		return <div>You have no activities yet.</div>
	}

	console.log(allTags)
	let moodDict = {}
	for (const tag of allTags) {
		activityDict[tag.name] = { joy: 0, sadness: 0, anger: 0, fear: 0, disgust: 0 }
	}

	for (const entry of props.entries) {
		for (const tag of entry.tags) {
			for (const mood of entry.moods) {
				activityDict[tag][mood] += 1
			}
		}
	}

	console.log(activityDict)

	let pieList = []
	for (const tag of allTags) {
		let dataset = [activityDict[tag.name]['joy'], activityDict[tag.name]['sadness'], activityDict[tag.name]['anger'], activityDict[tag.name]['fear'], activityDict[tag.name]['disgust']]
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
		const options = {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'Activity: ' + tag.name
				}
			}
		}
		pieList.push(<div key={tag.name} className='pie-activity'><Pie data={data} options={options} /></div>)
	}

	return <div className="pie-chart-list">{pieList.map((pie) => pie)}</div>
}

export default ActivityPies
