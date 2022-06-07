import Backend from './Backend'
import { useUser } from 'reactfire'
import { Menu } from '@mantine/core'
import { ExitIcon, PaperPlaneIcon } from '@modulz/radix-icons';
import './App.css'
import settingsImage from './img/settings.svg'

// ReactFire
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { query, orderBy, collection } from 'firebase/firestore';

function Navbar(props) {

	const { data: user } = useUser()

	// All entries query
	const firestore = useFirestore()
	const entryCollection = collection(firestore, 'journals', props.uid, 'entries')
	const entriesQuery = query(entryCollection, orderBy('date', 'desc'))
	const { data: entries } = useFirestoreCollectionData(entriesQuery, {
		idField: 'id'
	})
	
	return (
		<nav className="navbar">
			<ul className="navbar__list">
				<div className="navbar__left">
					<div className="navbar__item" key="title">Braindump</div>
				</div>
				<div className="navbar__center">
					<div className={`navbar__item button--view ${props.useJournalView ? 'button--view--selected' : ''}`} onClick={() => props.onUseJournalViewChange(true)}>Entries</div>
					<div className={`navbar__item button--view ${props.useJournalView ? '' : 'button--view--selected'}`} onClick={() => props.onUseJournalViewChange(false)}>Analytics</div>
				</div>
				<div className="navbar__right">
				{<div className="navbar__item label--user">
					{user && user.displayName}</div>}
					<Menu control={<div  className="button--settings"><img src={settingsImage} className="nav_button--settings" alt='settings'></img></div>}>
						<Menu.Label>Options</Menu.Label>
						<Menu.Item onClick={() => Backend.logout()} icon={<ExitIcon />}>Logout</Menu.Item>
						{/* <Menu.Item onClick={}>About</Menu.Item> */}
					</Menu>
				</div>
			</ul>
		</nav>
	)
}

export default Navbar