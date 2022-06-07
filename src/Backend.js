import { getAuth, signOut } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'

class Backend {
	static logout() {
		const auth = getAuth()
		signOut(auth)
	}

	static timestampToDate(timestamp) {
		return new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
	}

	static getMoodScores(text, callback) {
		var myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')
		myHeaders.append('Authorization', 'Basic ' + process.env.REACT_APP_IBM_KEY)

		var raw = JSON.stringify({
			text: text,
			features: {
				sentiment: {},
				emotion: {}
			}
		})

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}

		fetch(process.env.REACT_APP_IBM_URL, requestOptions)
			.then((response) => response.text())
			.then((result) => {
				callback(JSON.parse(result));
			})
			.catch((error) => console.log('error', error))
	}
}

export default Backend
