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
   ['543884642194', 'Antoo', true],
   ['151801928106195','@Anto', true],
   ['229356135813175', '@Jxta', true],
]

global.creator = [
   ['573155227977', 'Jota 🐼', true]
]

global.mods = 
global.prems = 


global.packname = 'Adhara Bot MD'
global.botname = 'Adhara Bot'
global.wm = 'Adhara Bot - MD'
global.author = 'Adhara MD'
global.dev = 'Adhara Bot'
global.errorm = 'Error: ${error.message}'
global.namebot = 'Adhara'
global.nameai = 'Adhara Ai'
global.textbot = 'ADHARA BOT MD'
global.textmain = 'ADHARABOT'
global.textmain2 = 'Adhara Bot MD'
global.vs = '2.1.0'
global.emotg = '💜'
global.msgtagall = '💜⋆ 𝗘𝗧𝗜𝗤𝗨𝗘𝗧𝗔 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 ⋆💜\n🛍️𝗔𝗱𝗾𝘂𝗶𝗲𝗿𝗲 𝗲𝗹 𝗯𝗼𝘁 𝗰𝗼𝗻 ⨾\n↳ wa.me/543884642194‬'
global.moneda = 'AdharaCoins'

global.sessions = 'AdharaSession'
global.jadi = 'JadiBots'
global.nameqr = 'Adhara'


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