import fetch from 'node-fetch'

const handler = async (m, { conn, args }) => {

  const userId = m.quoted?.sender || m.mentionedJid?.[0] || m.sender
  const user = global.db.data.users[userId] || {}

  const nme = await conn.getName(userId)
  const tag = `@${userId.split('@')[0]}`
  const name = user.registered && user.name ? user.name : await conn.getName(userId)
  const perfilUrl = await conn.profilePictureUrl(userId, 'image')
    .catch(() => 'https://files.catbox.moe/dx28sc.webp')
  const img = await (await fetch(perfilUrl)).buffer()

  const edad = user.age || 'No registrada'
  const desc = user.descripcion || 'Sin descripción'
  const exp = user.exp || 0
  const level = user.level || 0
  const role = user.role || 'Novato'
  const coin = user.coins || 0
  const bank = user.bank || 0
  const premium = user.premium ? '✅' : '❌'
  const registered = user.registered ? '✅' : '❌'

  const textoCorto = `Perfil de ${nme}`
  const tituloDecorado = dev
  const textoLargo = `
*Perfil - ${botname}*
  ╰╮ ${tag}

- *Nombre:* ${name}
- *Edad:* ${edad}
- *Descripción:* ${desc}
- *ID:* ${userId.split('@')[0]}

💫 *Exp:* ${exp.toLocaleString()}
🆙 *Nivel:* ${level}
☁️ *Rango:* ${role}

🪙 *${moneda}:* ${coin.toLocaleString()}
🏦 *Banco:* ${bank.toLocaleString()}

🪪 *Premium:* ${premium}
📝 *Registrado:* ${registered}
`.trim()

  await conn.sendLuffy(m.chat, textoCorto, tituloDecorado, textoLargo, img, img, 'https://instagram.com/dev.criss_vx', fkontak, { mentions: [m.sender] })
  await m.react('💥')
}

handler.help = ['profile']
handler.tags = ['rg']
handler.command = ['profile', 'perfil']

export default handler