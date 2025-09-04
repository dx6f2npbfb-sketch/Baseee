import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let insta = 'https://instagram.com/ineffable.mvrco'
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }
  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/jbecfc.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = `¡Bienvenid@! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo.`
  let txt1 = `¡Adiós! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`
  let txt2 = `Se salió ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo.`
  let sunflare = `𝙽𝚎𝚠 𝙼𝚎𝚖𝚋𝚎𝚛`
  let sunflare1 = `𝙺𝚒𝚌𝚔𝚎𝚍 𝙼𝚎𝚖𝚋𝚎𝚛`
  let sunflare2 = `𝙱𝚢𝚎 𝙼𝚎𝚖𝚋𝚎𝚛`

  if (chat.welcome && m.messageStubType == 27) {
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'sin descripción'

    let bienvenida = chat.sWelcome
      ? chat.sWelcome
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
      : `*¡┏━━━━━━━━━━━━━━━━━━━┓
┃      ✨ 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗫  ✨     ┃ 
┗━━━━━━━━━━━━━━━━━━━┛
╭─▸ 👤 Nuevo miembro:  
│      ${taguser} 
│
╰─▸ 🎉 Aquí se viene a:  
       ─ Reír 😂  
       ─ Compartir 🌍  
       ─ Pasarla brutal 🔥  
       ─ Hacer historia ⭐
       
┏━━━━━ 🎊 DISFRUTA 🎊 ━━━━━┓
┃   🚀 Ponte cómodx, que esto  
┃   es más que un grupo...  
┃   ¡Es una familia! 💜  
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

By ${botname}`,
`╔═══════════════════╗
   🎮 ＢＩＥＮＶＥＮＩＤ X 🎮
╚═══════════════════╝

⚡ ${taguser} ⚡  
✨ ¡Un gusto tenerte aquí! ✨  

📜 Reglas básicas:  
➤ Respeta a todos 🤝  
➤ Lee la descripción 📖  
➤ Disfruta y juega limpio 🕹️  

⚔️ ${groupName.toUpperCase()} ⚔️  
「 ¡Que comience la partida! 」🔥`
    await conn.sendLuffy(m.chat, txt, sunflare, bienvenida, img, img, insta, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'sin descripción'

    let ban = chat.sKick
      ? chat.sKick
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
      : `︵‿︵‿୨♡୧‿︵‿︵
🗑️ ${taguser} 🗑️
   FUE ELIMINAD@
︵‿︵‿୨♡୧‿︵‿︵

👉 No dio el level  
👉 Kick directo del grupo  
👉 Pa adornar esta la/el lider 😏 

「 Ni modo bebé, nomas eras planta🌱 」`,
`╔════ 💀 ════╗
  🚮 ELIMINAD@ 🚮
╚════ 💀 ════╝

${taguser} fue sacadx del grupo 🎮  
➤ Jugador expulsado por planta 🌱  
➤ No juega ni con la comida 😂  

🚷 Next... ¡que pase el que sigue!`
    await conn.sendLuffy(m.chat, txt1, sunflare1, ban, img, img, insta, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'sin descripción'

    let bye = chat.sBye
      ? chat.sBye
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
      : `╔════ ⚰️ ════╗
  👋 ADIÓS NOOB 👋
╚════ ⚰️ ════╝

${taguser} decidió  
➤ Abandonar el grupo 😒  
➤ Mucho nivel pa alguien tan malo. 😌  

🪦 Que le vaya bien, por la sombra...`
    await conn.sendLuffy(m.chat, txt1, sunflare2, bye, img, img, insta, fkontak)
  }
}