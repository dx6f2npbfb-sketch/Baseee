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
   ['5493855789747', 'Chinchu_dzn', true],
   ['229356135813175', '@Jxta', true],
]

global.creator = [
   ['573155227977', 'Jota 🐼', true]
]

global.mods = ['51990841568', '51965911060']
global.prems = ['51965911060', '51906168999']


global.packname = 'Jota Bot MD'
global.botname = '𝗬𝗔𝗡𝗖𝗜𝗧𝗢 𝗕𝗢𝗧🕷️'
global.wm = 'Yancito Bot - MD'
global.author = '𝗬𝗮𝗻𝗰𝗶𝘁𝗼 𝗕𝗼𝘁'
global.dev = 'Yancito Bot MD'
global.errorm = 'Error: ${error.message}'
global.namebot = '𝗬𝗔𝗡𝗖𝗜𝗧𝗢'
global.nameai = 'Yancito Ai'
global.textbot = 'YANCITO BOT MD'
global.textmain = 'YANCITOBOT'
global.textmain2 = 'Yancito Bot MD'
global.vs = '2.1.0'
global.emotg = '🕷️'
global.msgtagall = '🕷️ ᴍᴇɴᴄɪoɴ ɢᴇɴᴇʀᴀʟ 🕷️\n ʏᴀɴꜱɪᴛᴏ ʙᴏᴛ ʟᴏꜱ ɪɴᴠᴏᴄᴀ ✨️'
global.moneda = 'YancitoCoins 🪙'

global.sessions = 'SessionYancito'
global.jadi = 'JadiBots'
global.nameqr = 'Yancito'


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