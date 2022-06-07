import 'firebaseui/dist/firebaseui.css'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "reactfire";
import '../App.css'
import imageLogo from '../img/braindump.png'
// import landingImage from '../img/landing.png'

// compat SDK needed for FirebaseUI
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function AuthSetup() {

	// var signInCheckResult = { signedIn: false };

	var uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false,
		}
	}

	const v9AuthInstance = useAuth();
	const v8AppInstance = firebase.initializeApp(v9AuthInstance.app.options);
	const v8AuthInstance = v8AppInstance.auth();

	// var showCheck = signInCheckResult !== undefined && signInCheckResult.signedIn !== false
	return (
		<div className='authHeader'>
			<img className='logo-img' src={imageLogo} alt="" />
			<h1>Braindump</h1>
			<div className="landing-caption">An AI assisted mental health journaling app!</div>
			<StyledFirebaseAuth firebaseAuth={v8AuthInstance} uiConfig={uiConfig} />
			<div className="landing-background"></div>
			{/* <img className='landing-img' src={landingImage} alt="" /> */}
		</div>
	)
}

export default AuthSetup;