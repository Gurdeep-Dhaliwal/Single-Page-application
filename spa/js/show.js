
/* shows.js */

console.log('SHOWS')

import { customiseNavbar, file2DataURI, loadPage, router, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('SHOWS: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Shows'
		const user = localStorage.getItem('username')
		const token = 'Basic ' + btoa(`${user}:${user}`)
		const response = await secureGet('/api/admin', token)
		console.log(response)
		if(response.status === 201){
			localStorage.setItem('IsAdmin', true)
			customiseNavbar(['home', 'show', 'addshow', 'logout'])
		} else{
			customiseNavbar(['home', 'show', 'logout'])
		}
		if(localStorage.getItem('authorization') === null) {
			history.pushState(null, null, '/login')
			await router()
		}
	} catch(err) {
		console.error(err)
	}
}

