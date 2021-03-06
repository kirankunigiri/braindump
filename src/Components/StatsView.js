import './StatsView.css'

import YearGrid from './StatsWidgets/YearGrid';
import ActivityCount from './StatsWidgets/ActivityCount';
import MoodPie from './StatsWidgets/MoodPie';
import { Divider } from '@mantine/core';

import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { query, orderBy, collection } from 'firebase/firestore';
import MoodLine from './StatsWidgets/MoodLine';
import ActivityPies from './StatsWidgets/ActivityPies';

function StatsView(props) {

	// All entries query
	const firestore = useFirestore()
	const entryCollection = collection(firestore, 'journals', props.uid, 'entries')
	const entriesQuery = query(entryCollection, orderBy('date', 'desc'))
	const { data: entries } = useFirestoreCollectionData(entriesQuery, {
		idField: 'id'
	})

	if (!entries) {
		return ''
	}

	return (
		<div className='stats-view'>
			<div className='stats-title'>Mood Trends</div>
			<MoodLine uid={props.uid} entries={entries}/>
			<MoodPie uid={props.uid} entries={entries}/>
			<Divider className='stats-divider' my="md" />
			
			<div className='stats-title'>Mood & Activity Correlation</div>
			<ActivityPies uid={props.uid} entries={entries}/>
			{/* <YearGrid uid={props.uid} entries={entries}/>
			<ActivityCount uid={props.uid} entries={entries}/> */}
		</div>
	);
}

export default StatsView;