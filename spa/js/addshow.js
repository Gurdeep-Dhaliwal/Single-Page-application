
/* addshows.js */

console.log('ADDSHOWS')

import { customiseNavbar, file2DataURI, loadPage, router, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('SHOWS: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Foobar'
		customiseNavbar(['home', 'show', 'addshow', 'logout'])
		if(localStorage.getItem('authorization') === null) {
			history.pushState(null, null, '/login')
			await router()
		}
		// there is a token in localstorage
		node.querySelector('form').addEventListener('submit', await uploadData)
	} catch(err) {
		console.error(err)
	}
}

async function uploadData(event) {
	console.log('func UPLOAD DATA')
	event.preventDefault()
    const formData = new FormData(event.target)
    const showData = Object.fromEntries(formData.entries())
    console.log(showData)
    const element = document.querySelector('input[name="file"]')
	console.log(element)
	const current = new Date()
	showData.currentTime = current.toLocaleString()
	showData.file = document.querySelector('input[name="file"]').files[0]
	showData.file.base64 = await file2DataURI(showData.file)
	showData.file.user = localStorage.getItem('username')
	console.log(showData.file)
	const url = '/api/shows'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		},
        body: JSON.stringify(showData)
	}
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	console.log(json)
	showMessage('file uploaded')
	loadPage('home')
}
