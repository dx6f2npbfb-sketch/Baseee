import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }
  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = `¡Bienvenid@! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo.`
  let txt1 = `¡Adiós! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`
  let txt2 = `Se salió ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo.`
  let sunflare = `Credits to Sunflare Team ⛅`
  let sunflare1 = `Credits to Shadow′s Club 🌹`
  let sunflare2 = `Credits to Ī′m Dev.Criss 🇦🇱`

if (chat.welcome && m.messageStubType == 27) {
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  const msgsWelcome = [
    `╔════   *𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐗*    ═══╗
╠═ ${taguser}
╠ *UN GUSTO TENERTE AQUI* 👋
╠ Disfruta de la estadía 🫰
╠ Recuerda leer la descripción... 
║
╠══ ${botname} ═╣`,
`┏━━━━━━━━━━━━━━
┃──〘 *𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗫* 〙
┃━━━━━━━━━━━━
┃── ${taguser}
┃ *_Un gusto tenerte aqui_*
┃ *_Disfruta tu estadía 😇_*
┃
┗━━━━━ ${botname} ━━━━━━`
  ]


  let bienvenida = chat.sWelcome
    ? chat.sWelcome
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
    : msgsWelcome[Math.floor(Math.random() * msgsWelcome.length)]

  await conn.sendLuffy(m.chat, txt, sunflare, bienvenida, img, img, channel, estilo)
}

if (chat.welcome && m.messageStubType == 28) {
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  let ban = chat.sKick
    ? chat.sKick
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
    : `┌─★ 𝙅𝙊𝙏𝘼 𝘽𝙊𝙏🐼 
│「 ADIOS 👋 」
└┬★ 「 ${taguser} 」
   │☠️ *Acabas de ser escupido por puta planta*
   │💫 *Ni modo, hasta luego...*
   └────────┈ ⳹`    
    await conn.sendLuffy(m.chat, txt1, sunflare1, ban, img, img, ig, estilo)
  }

if (chat.welcome && m.messageStubType == 32) {
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  const msgsBye = [
    `╭───────👾───────╮
     🚪 SE FUÉ 🚪
    ${taguser}
╰───────👾───────╯

🛑 No aguantó la presión  
😂 Otro caído en el intento  
🔥 El grupo sigue... pero sin ti  

「 Gracias por nada, campeón 🐌 」`,
    `╔════ ⚰️ ════╗
   👋 ADIÓS NOOB 👋
╚════ ⚰️ ════╝

${taguser} decidió  
➤ Abandonar el grupo 🎮  
➤ Muy malo era  

🪦 Que le vaya bien por la sombrita...`
  ]

  let bye = chat.sBye
    ? chat.sBye
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
    : msgsBye[Math.floor(Math.random() * msgsBye.length)]

    await conn.sendLuffy(m.chat, txt1, sunflare2, bye, img, img, grupo, estilo)
  }}