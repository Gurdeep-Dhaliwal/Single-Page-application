
/* accounts.js */

import { compare, genSalt, hash } from 'bcrypt'
import { db } from 'db'

const saltRounds = 10
const salt = await genSalt(saltRounds)

export async function login(credentials) {
	const { user, pass } = credentials
	let sql = `SELECT count(id) AS count FROM accounts WHERE user="${user}";`
	let records = await db.query(sql)
	if(!records[0].count) throw new Error(`username "${user}" not found`)
	sql = `SELECT pass FROM accounts WHERE user = "${user}";`
	records = await db.query(sql)
	const valid = await compare(pass, records[0].pass)
	if(valid === false) throw new Error(`invalid password for account "${user}"`)
	return user
}

export async function register(credentials) {
	credentials.pass = await hash(credentials.pass, salt)
	const sql = `INSERT INTO accounts(user, pass, admin) VALUES("${credentials.user}", "${credentials.pass}", "0")`
	console.log(sql)
	await db.query(sql)
	return true
}

export async function isAdmin(credentials){
	const { user, pass} = credentials
	let sql = `SELECT admin FROM accounts WHERE user="${user}";`
	console.log(sql)
	let records = await db.query(sql)
	if(records[0].admin === 1){
		return true
	} else if(records[0].admin === 0){
		return false
	}
}