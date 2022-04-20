
/* home.js */

console.log('HOME')

import { customiseNavbar, file2DataURI, loadPage, router, secureGet, showMessage} from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home', 'show', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'show', 'register', 'login']) //navbar if logged out
		// add content to the page
		const user = localStorage.getItem('username')
		const tokens = 'Basic ' + btoa(`${user}:${user}`)
		const response = await secureGet('/api/admin', token)
		console.log(response)
		if(response.status === 401){
			const response = await secureGet('/api/showShows', tokens)
			console.log(response)
			const template = document.querySelector('template#shows')
			let i = 0
			for(const show of response.json.data.shows[0]){
				//DATES
				const date1 = response.json.data.shows[0][i].startdate 
				const date2 = response.json.data.shows[0][i].enddate
				const date1_n = date1.split('T')[0].split('-')
				const date2_n = date2.split('T')[0].split('-')
				const date1Formatted = date1_n[2]+"-"+date1_n[1]+"-"+date1_n[0]
				const date2Formatted = date2_n[2]+"-"+date2_n[1]+"-"+date2_n[0]
				const date1Time = new Date(date1_n[0],date1_n[1],date1_n[2]).getTime()
				const date2Time = new Date(date2_n[0],date2_n[1],date2_n[2]).getTime()
				const DifferenceInTime = date2Time - date1Time
				const DiffDays = (DifferenceInTime)/(1000*3600*24)
				//IMG
				const File = response.json.data.shows[0][i].file
				const FilePath = '/uploads/' + File
				const img =  document.createElement('img')
				img.src = FilePath
				img.width = 200
				//TEMPLATE
				const fragment = template.content.cloneNode(true)
				fragment.querySelector('h2').innerText = response.json.data.shows[0][i].nameofshow
				fragment.querySelector('p').innerText = `Start Date: `+ date1Formatted
				fragment.querySelector('p3').innerText = `Runs for `+DiffDays+` days`
				node.appendChild(fragment)
				node.appendChild(img)
				i = i + 1	
				}
		}else{
			const response = await secureGet('/api/showShows', tokens)
			console.log(response)
			const template = document.querySelector('template#shows')
			let i = 0
			for(const show of response.json.data.shows[0]){
				//DATES
				const date1 = response.json.data.shows[0][i].startdate 
				const date2 = response.json.data.shows[0][i].enddate
				const date1_n = date1.split('T')[0].split('-')
				const date2_n = date2.split('T')[0].split('-')
				const date1Formatted = date1_n[2]+"-"+date1_n[1]+"-"+date1_n[0]
				const date2Formatted = date2_n[2]+"-"+date2_n[1]+"-"+date2_n[0]
				const date1Time = new Date(date1_n[0],date1_n[1],date1_n[2]).getTime()
				const date2Time = new Date(date2_n[0],date2_n[1],date2_n[2]).getTime()
				const DifferenceInTime = date2Time - date1Time
				const DiffDays = (DifferenceInTime)/(1000*3600*24)
				//IMG
				const File = response.json.data.shows[0][i].file
				const FilePath = '/uploads/' + File
				const img =  document.createElement('img')
				img.src = FilePath
				img.width = 200
				//Button
				let btn = document.createElement('button')
				btn.innerHTML = "Details"
				localStorage.setItem('nameofshow', response.json.data.shows[0][i].nameofshow)
				localStorage.setItem('startdate', date1_n)
				localStorage.setItem('enddate', date2_n)
				localStorage.setItem('file', File)
				localStorage.setItem('description', response.json.data.shows[0][i].description)
				btn.addEventListener("click", async event => {
					loadPage('play')
				})
				//TEMPLATE
				const fragment = template.content.cloneNode(true)
				fragment.querySelector('h2').innerText = response.json.data.shows[0][i].nameofshow
				fragment.querySelector('p').innerText = `Start Date: `+ date1Formatted
				fragment.querySelector('p3').innerText = `Runs for `+DiffDays+` days`
				node.appendChild(fragment)
				node.appendChild(img)
				node.appendChild(btn)
				i = i + 1	
				}
		}
	} catch(err) {
		console.error(err)
	}
}
