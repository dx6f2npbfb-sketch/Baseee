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
global.botname = 'Yancito Bot - MD'
global.wm = 'Yancito Bot - MD'
global.author = '𝗬𝗮𝗻𝗰𝗶𝘁𝗼 𝗕𝗼𝘁'
global.dev = 'Yancito Bot MD'
global.errorm = 'Error: ${error.message}'
global.namebot = 'Yancito'
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


global.grupo = 'https://chat.whatsapp.com/IJyN3cklID5HVKU3nAi0XL?mode=ac_t'
global.comu = 'https://chat.whatsapp.com/Er5zgBnAW9A8rfGaXGIvhI?mode=ac_t'
global.channel = 'https://whatsapp.com/channel/0029VauTE8AHltY1muYir31n'
global.ig = 'https://www.instagram.com/dev.criss_vx'


global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "543876577197-120363317332020195@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'Yanito Bot MD', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}


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