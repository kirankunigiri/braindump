import { Fragment, useState } from 'react';
import EntryPreview from './EntryPreview';
import { Button, TextInput } from '@mantine/core';
import { Timestamp } from 'firebase/firestore';
import JournalEditor from './Components/JournalEditor';

// ReactFire
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { query, orderBy, collection, addDoc } from 'firebase/firestore';
import Backend from './Backend';

function JournalView(props) {

	// States setup
	const [selectedEntry, setSelectedEntry] = useState(null)
	const [filterText, setFilterText] = useState('');

	// Firebase
	const firestore = useFirestore()
	const entryCollection = collection(firestore, 'journals', props.uid, 'entries')
	const entriesQuery = query(entryCollection, orderBy('date', 'desc'))
	const { data: entries } = useFirestoreCollectionData(entriesQuery, {
		idField: 'id'
	})
	

	// Handlers
	const entryPreviewClickedHandler = (item) => {
		setSelectedEntry(item)
	}

	const entryDeleteHandler = () => {
		setSelectedEntry(null);
	}

	const addEntryHandler = (event) => {
		const newEntry = {title: '', date: Timestamp.now(), content: '', tags: []}
		addDoc(entryCollection, newEntry).then((newDoc) => {
			newEntry.id = newDoc.id
			entryPreviewClickedHandler(newEntry)
		})
	}

	const searchChangeHandler = (event) => {
		setFilterText(event.target.value.toLowerCase())
	}

	// Filter
	var filteredEntries = [];
	if (filterText.length > 0) {
		filteredEntries = entries.filter(entry => entry.title.toLowerCase().includes(filterText) || entry.content.toLowerCase().includes(filterText));
	}

	// Show list of all entries separated by month
	function getEntryElements(entryList) {
		if (entryList && entryList.length > 0) {
			var prevMonth = Backend.timestampToDate(entryList[0].date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
			return entryList?.map((entry, index) => {
				const newMonth = Backend.timestampToDate(entry.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
				const isNewMonth = index === 0 || prevMonth !== newMonth;
				prevMonth = newMonth
				return (
					<Fragment key={entry.id}>
						{isNewMonth && <div className="month-year">{Backend.timestampToDate(entry.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</div>}
						<EntryPreview data={entry} selected={Boolean(selectedEntry) && selectedEntry.id === entry.id} onEntrySelected={entryPreviewClickedHandler}/>
					</Fragment>
				)
			})	
		}
	}

	// Render
	return (
		
		<div className="content">

			{/* Sidebar */}
			<div className="sidebar">

				{/* Add entry button */}
				<Button color="violet" style={{margin: '1rem'}} onClick={addEntryHandler}>+ New Entry</Button>

				{/* Filter Section */}
				<div className="filter">
					<div className="search-bar">
						<img src="img/search.svg" alt="" />
						<TextInput onChange={searchChangeHandler} placeholder='Search...'></TextInput>
					</div>
				</div>

				{/* List of Entries */}
				<div className="entries">
					{filterText.length > 0 ? getEntryElements(filteredEntries) : getEntryElements(entries)}
				</div>
			</div>

			{/* Journal Entry */}
			{selectedEntry && <JournalEditor entry={selectedEntry} userId={props.uid} entryId={selectedEntry.id} onDelete={entryDeleteHandler} onClose={entryDeleteHandler}/>}
		</div>
	)
}

export default JournalView