import Backend from "./Backend"

function EntryPreview(props) {

	const entryClicked = (event) => {
		props.onEntrySelected(props.data)
	}

	// if (props.data.date === undefined || props.data.tags === undefined) {
	// 	return ''
	// }

	// String creation
	const date = Backend.timestampToDate(props.data.date);
	const dayNumber = date.toLocaleDateString('en-US', { day: 'numeric'});
	const dayLong = date.toLocaleDateString('en-US', { weekday: 'long'}).substring(0, 3).toUpperCase();
	const tagString = props.data.tags.map((tag) => `#${tag} `);
	tagString.join();

	// Render
	return (
		<div className={`entry-block ${props.selected ? 'entry-block--selected' : ''}`} onClick={entryClicked}>
			<div className="date">
				<div className="date__day">{dayLong}</div>
				<div className="date__month">{dayNumber}</div>
			</div>
			{Boolean(props.data.mood) && <img className="mood" src={Backend.moodImages[props.data.mood-1]} alt="happy"/>}
			<div className="description">
				<div className="description__text"><b>{props.data.title}</b> {props.data.content}</div>
				<div className="description__tags">{tagString}</div>
			</div>
		</div>
	)
}

export default EntryPreview
