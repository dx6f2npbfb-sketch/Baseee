import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
   ['573155227977', 'Jota 🐼', true],
   ['56922113858', 'Alee🎭', true],
   ['229356135813175', '@Jxta', true],
   ['66954804637', '@Alee', true],
]

global.creator = [
   ['573155227977', 'Jota 🐼', true]
]

global.mods = 
global.prems = 


global.packname = 'Lokweed Bot MD'
global.botname = 'Lokweed Bot'
global.wm = 'Lokweed Bot - MD'
global.author = 'Lokweed MD'
global.dev = 'Lokweed Bot by Jotaa.hrz'
global.errorm = 'Error: ${error.message}'
global.namebot = 'Lokweed'
global.nameai = 'Lokweed Ai'
global.textbot = 'LOKWEED BOT MD'
global.textmain = 'LOKWEEDBOT'
global.textmain2 = 'Lokweed Bot MD'
global.vs = '2.1.0'
global.emotg = '🎭'
global.msgtagall = '𝗠𝗘𝗡𝗖𝗜𝗢𝗡 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 𝗟𝗢𝗞𝗪𝗘𝗘𝗗 𝗕𝗢𝗧'
global.moneda = 'LokweedCoins'

global.sessions = 'LokweedSession'
global.jadi = 'JadiBots'
global.nameqr = 'Lokweed'


global.catalogo = fs.readFileSync('./media/catalogo.jpg')


global.grupo = 
global.comu = 
global.channel = 
global.ig = 


global.estilo = 


global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        


global.multiplier = 69 
global.maxwarn = '3'


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})