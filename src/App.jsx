import './App.css';
import Navbar from './Navbar';
import JournalView from './JournalView';
import StatsView from './Components/StatsView';
import AuthSetup from './Components/AuthSetup';
import { useState } from 'react';

// ReactFire
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useUser, useFirebaseApp} from 'reactfire';

function App() {
	
	const firebaseApp = useFirebaseApp();
	const firestoreInstance = getFirestore(firebaseApp);
	const { status, data: user } = useUser();
	const [useJournalView, setUseJournalView] = useState(true);

	if (status === 'loading') {
		return <span>loading...</span>
	}

	const useJournalViewChanged = (result) => {
		setUseJournalView(result)
	}

	if (user && user.displayName) {
		return (
			<FirestoreProvider sdk={firestoreInstance}>
				<div className="header">
					<Navbar uid={user.uid} onUseJournalViewChange={useJournalViewChanged} useJournalView={useJournalView} />
					{useJournalView ? <JournalView uid={user.uid} /> : <StatsView uid={user.uid}/>}
				</div>
			</FirestoreProvider>
		)
	  } else if (user === null) {
		  return <AuthSetup/>;
	  } else {
		  return ''
	  }
}

export default App;