function ActivityCount(props) {

	var tagCounts = {}
	for (let entry of props.entries) {
		for (let tag of entry.tags) {
			if (tagCounts[tag]) {
				tagCounts[tag] += 1
			} else {
				tagCounts[tag] = 1
			}
		}
	}
	
	return (
		<div className='widget-xl'>
			<h1>Activity Count</h1>
			{Object.entries(tagCounts).map((tag) => (
				<p key={tag[0]}>{tag[0]}: {tag[1]}</p>
			))}
		</div>
	);
}

export default ActivityCount;