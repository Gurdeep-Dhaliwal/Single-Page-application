
/* routes.js */

import { Router } from 'oak'

import { extractCredentials, dataURLtoFile } from 'util'
import { login, register, isAdmin } from 'accounts'
import { uploadData, showShows } from '/home/codio/workspace/api/modules/shows.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	context.response.headers.set('Content-Type', 'text/html')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/showShows', async context => {
	console.log('GET /api/showShows')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const shows = await showShows(credentials)
		console.log(`routerShows: `, shows)
		context.response.body = JSON.stringify(
			{
				data: { shows }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.get('/api/admin', async context => {
	console.log('GET /api/admin')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/vnd.api+json')
	try {
		const credentials = extractCredentials(token)
		const admin = await isAdmin(credentials)
		console.log(`admin: ${admin}`)
		context.response.body = JSON.stringify(
			{
				data: { admin }
			}
		, null, 2)
		if(admin === true){
			context.response.status = 201
		}
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})


router.post('/api/shows', async context => {
	console.log('POST /api/shows')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		const CurrentTime = data.currentTime
		const showPortraitURL = dataURLtoFile(data.file.base64, data.file.user)
		const UploadedData = await uploadData(data, showPortraitURL, CurrentTime)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		, null, 2)
		if(UploadedData === false){
			context.response.status = 202
		}
	} catch(err) {
		context.response.status = 400
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: 'a problem occurred',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

export default router

