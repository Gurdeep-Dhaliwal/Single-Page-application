
/* play.js */

import { createToken, customiseNavbar, secureGet, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
		console.log('PLAY: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'Play'
		customiseNavbar(['home', 'show', 'logout'])
        //add content to page
        const user = localStorage.getItem('username')
        const NameOfShow = localStorage.getItem('nameofshow')
        const StartDate = localStorage.getItem('startdate')
        const EndDate = localStorage.getItem('enddate')
        const Description = localStorage.getItem('description')
        const File = localStorage.getItem('file')
        //
        const FilePath = '/uploads/' + File
		const img =  document.createElement('img')
		img.src = FilePath
        img.width = 500
        //
        const template = document.querySelector('template#play')
        //TEMPLATE
        const fragment = template.content.cloneNode(true)
        fragment.querySelector('h1').innerText = NameOfShow
        fragment.querySelector('p3').innerText = Description
        node.appendChild(fragment)
        node.appendChild(img)
	} catch(err) {
		console.error(err)
	}
}

