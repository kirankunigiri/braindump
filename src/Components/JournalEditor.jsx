import { useState, useRef, useEffect } from "react";
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import Textarea from 'react-expanding-textarea'
import { resize } from 'react-expanding-textarea'
import { updateDoc, doc, query, orderBy, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { TextInput, MultiSelect, ActionIcon, Tooltip } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import Backend from "../Backend";
import { TrashIcon, Cross1Icon } from "@modulz/radix-icons";
import './JournalEditor.css';

function JournalEditor(props) {

	// const [tags, setTags] = useState(['React', 'Angular', 'Svelte', 'Vue']);
	const [selectedTags, setSelectedTags] = useState([]);
	
	// Firebase
	const firestore = useFirestore()
	function updateEntry(updates) {
		const selectedDoc = doc(firestore, 'journals', props.userId, 'entries', props.entryId)
		updateDoc(selectedDoc, updates)
	}

	// All Owned Tags Query
	const tagsCollection = collection(firestore, 'journals', props.userId, 'tags')
	const tagsQuery = query(tagsCollection, orderBy('name', 'desc'))
	const { data: allTags } = useFirestoreCollectionData(tagsQuery, {
		idField: 'id'
	})

	// Element Setup
	const textareaRef = useRef(null)
	const titleInputRef = useRef(null)
	const tagsInputRef = useRef(null)
	const [date, setDate] = useState(null);

	// Resize text area
	useEffect(() => {
		textareaRef.current.focus()
		textareaRef.current.value = props.entry.content
		resize(0, textareaRef.current)
		titleInputRef.current.value = props.entry.title
		setDate(Backend.timestampToDate(props.entry.date))
		setSelectedTags(props.entry.tags)
	}, [props.entry])

	// Change Handlers
	const moodChangeHandler = (mood) => {
		updateEntry({mood})
	}

	function journalTextAreaHandler(e) {
		updateEntry({content: e.target.value})
	}

	const titleChangeHandler = (e) => {
		updateEntry({title: e.target.value})
	}

	const dateChangeHandler = (newDate) => {
		setDate(newDate)
		updateEntry({date: newDate})
	}

	const tagsChangeHandler = (newTags) => {
		updateEntry({tags: newTags})
		setSelectedTags(newTags)
	}

	const createTagHandler = (newTag) => {
		addDoc(tagsCollection, { name: newTag })
	}

	const deleteEntryHandler = () => {
		const selectedDoc = doc(firestore, 'journals', props.userId, 'entries', props.entryId)
		deleteDoc(selectedDoc)
		props.onDelete();
	}

	return (
		<div className="journal">
			<div className="button--close" onClick={() => props.onClose()}>  {/* Mobile Only Button */}
				<ActionIcon size="lg" color="red" variant="light">
					<Cross1Icon />
				</ActionIcon>
			</div>
			<div className="button--trash" onClick={deleteEntryHandler}>
				<Tooltip label="Delete entry">
					<ActionIcon size="lg" color="red" variant="light">
						<TrashIcon />
					</ActionIcon>
				</Tooltip>
			</div>
			<div className="journal__heading">
				<div className="journal__heading-text">
					<TextInput ref={titleInputRef} className="journal__heading-title" onChange={titleChangeHandler} placeholder="Entry Title"/>
					<DatePicker excludeDate={(date) => date > new Date()} value={date} placeholder="Entry date" clearable={false} variant="unstyled" onChange={dateChangeHandler}/>
					<div className="mood-stuff">
						<div>Mood Score: 7/10</div>
						<div>Emotions: Sad, Anger</div>
					</div>
				</div>
			</div>
			{allTags && <MultiSelect ref={tagsInputRef}
				data={allTags.map((tag) => tag.name)}
				value={selectedTags}
				placeholder="Select Activities"
				searchable
				creatable
				getCreateLabel={(query) => `+ Create tag ${query}`}
				onCreate={createTagHandler}
				onChange={tagsChangeHandler}
			/>}
			<div className="journal__entry">
				<Textarea
					className="journal__input"
					defaultValue={props.entry.content}
					id="my-textarea"
					name="journal-textarea"
					onChange={journalTextAreaHandler}
					placeholder="Enter additional notes..."
					ref={textareaRef}
				/>
			</div>
		</div>
	);
}

export default JournalEditor;