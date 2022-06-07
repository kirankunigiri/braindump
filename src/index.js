import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { AuthProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';

// ReactFire setup
import { FirebaseAppProvider } from 'reactfire';
const firebaseConfig = {
	apiKey: "AIzaSyAiXXOM4R3GAoWpTbvuvV5e9BYq7UP39NI",
	authDomain: "braindump-2747e.firebaseapp.com",
	projectId: "braindump-2747e",
	storageBucket: "braindump-2747e.appspot.com",
	messagingSenderId: "1080651662057",
	appId: "1:1080651662057:web:c5d0799e4492d41d32e678"
  };

ReactDOM.render(
	<FirebaseAppProvider firebaseConfig={firebaseConfig}>
		<AuthElement></AuthElement>
	</FirebaseAppProvider>,
	document.getElementById('root')
)

function AuthElement() {
	const firebaseApp = useFirebaseApp();
	const auth = getAuth(firebaseApp);
	return (
		<AuthProvider sdk={auth}>
			<App />
		</AuthProvider>
	)
}