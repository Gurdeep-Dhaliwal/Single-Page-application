
/* shows.js */

import {db} from 'db'

export async function uploadData(credentials, showPortraitURL, currenttime) {
    const date1 = credentials.startdate
    const date2 = credentials.enddate
    const date1_n = date1.split('T')[0].split('-')
	const date2_n = date2.split('T')[0].split('-')
	const date1Time = new Date(date1_n[0],date1_n[1],date1_n[2]).getTime()
	const date2Time = new Date(date2_n[0],date2_n[1],date2_n[2]).getTime()
    const dateDiff = date2Time - date1Time
    if(dateDiff<0){
        throw new ERROR(`invalid, Start Date After End Date`)
        return false
    }else {
        const sql = `INSERT INTO shows(nameofshow, description, file, startdate, enddate, time_show_added) VALUES("${credentials.nameofshow}", "${credentials.description}", "${showPortraitURL}", "${credentials.startdate}", "${credentials.enddate}", "${currenttime}")`
        console.log(sql)
        await db.query(sql)
        return true    
    }
}

export async function showShows(credentials) {
    let sql = `SELECT * FROM shows ORDER BY startdate;`
    const shows = await db.query(sql)
    const shows2 = [shows]
    console.log(`db: `,shows2)
    return shows2
}