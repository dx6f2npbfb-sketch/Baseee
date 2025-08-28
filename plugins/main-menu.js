//creado y editado por BrayanOFC
import { xpRange } from '../lib/levelling.js'
import ws from 'ws'

let tags = {
  'serbot': 'SUB BOTS',
  'main': 'ZENO INFO',
  'owner': 'DIOS CREADOR',
  'nable': 'MODO SAIYAJIN',
  'cmd': 'ESFERAS',
  'advanced': 'TÉCNICAS',
  'game': 'COMBATE',
  'rpg': 'RPG Z',
  'group': 'UNIVERSO',
  'downloader': 'CAPSULE CORP',
  'sticker': 'FUSIONES',
  'audio': 'GRITOS',
  'search': 'RADAR',
  'tools': 'ARTEFACTOS',
  'fun': 'HUMOR Z',
  'anime': 'DB-ANIME',
  'nsfw': 'MAJIN',
  'premium': 'GOD KI',
  'weather': 'CLIMA Z',
  'news': 'NOTICIAS',
  'finance': 'ZENI',
  'education': 'MENTE Z',
  'health': 'SENZU',
  'entertainment': 'ARENA',
  'sports': 'TORNEO',
  'travel': 'KAIKAI',
  'food': 'RAMEN Z',
  'shopping': 'TIENDA DE BULMA',
  'productivity': 'MAQUINARIA Z',
  'social': 'REDES Z',
  'security': 'BARRERA',
  'custom': 'AURA PERSONAL'
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let userId = m.mentionedJid?.[0] || m.sender
    let user = global.db.data.users[userId]
    let name = await conn.getName(userId)
    let mode = global.opts["self"] ? "Modo Privado 🔒" : "Modo Público 🌀"
    let totalCommands = Object.keys(global.plugins).length
    let totalreg = Object.keys(global.db.data.users).length
    let uptime = clockString(process.uptime() * 1000)

    const users = [...new Set(
      (global.conns || []).filter(conn =>
        conn.user && conn.ws?.socket?.readyState !== ws.CLOSED
      )
    )]

    if (!user) {
      global.db.data.users[userId] = { exp: 0, level: 1 }
      user = global.db.data.users[userId]
    }

    let { exp, level } = user
    let { min, xp, max } = xpRange(level, global.multiplier)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
      tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
      limit: plugin.limit,
      premium: plugin.premium,
    }))

    let menuText = `
╭━━━『🐉 ${botname.toUpperCase()} | DRAGON MENU』━━━╮
┃ ⚡ Usuario Saiyajin: ${name}
┃ 👑 Rango          : ${(conn.user.jid == global.conn.user.jid ? 'DIOS BrayanOFC 🅥' : 'SUB-BOT KAIO 🅑')}
┃ 🌌 Universo       : ${mode}
┃ 📊 Registro Z     : ${totalreg}
┃ ⏱️ Tiempo Activo  : ${uptime}
┃ 🛠️ Comandos Totales: ${totalCommands}
┃ 🌀 Sub Bots Activos: ${users.length}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

💥 *⚔️ SECCIONES DEL TORNEO DEL PODER ⚔️* 💥
${Object.keys(tags).map(tag => {
  const commandsForTag = help.filter(menu => menu.tags.includes(tag))
  if (commandsForTag.length === 0) return ''
  let section = `
╭───〔 ${tags[tag]} ${getRandomEmoji()} 〕───╮
${commandsForTag.map(menu => menu.help.map(help =>
  `┃ ☁️${_p}${help}${menu.limit ? ' 🟡' : ''}${menu.premium ? ' 🔒' : ''}`
).join('\n')).join('\n')}
╰━━━━━━━━━━━━━━━━━━━━╯`
  return section
}).filter(text => text !== '').join('\n')}

🔥 *By BrayanOFC* 🔥
`.trim()

    await m.react('🐉', '🌌')

    await conn.sendMessage(m.chat, {
      video: { url: 'https://qu.ax/YcKnl.mp4' },
      caption: menuText,
      gifPlayback: true,
      mimetype: 'video/mp4',
      fileName: 'dragon-menu.mp4',
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363394965381607@newsletter',
          newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱*:·',
          serverMessageId: 100
        }
      }
    }, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, `✖️ Menú en modo Dragon Ball falló.\n\n${e}`, m)
    throw e
  }
}

handler.help = ['menu', 'allmenu']
handler.tags = ['main']
handler.command = ['menu', 'allmenu', 'menú']
handler.register = true

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getRandomEmoji() {
  const emojis = ['🐉', '⚡', '🔥', '👑', '💥', '🌌']
  return emojis[Math.floor(Math.random() * emojis.length)]
}
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let { exp, coins, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)

    exp = exp || '0'
    role = role || 'Novato'

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
    const _uptime = process.uptime() * 1000
    const uptime = clockString(_uptime)

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    const readMore = '\u200b'.repeat(850)

    await m.react('🐼')

    const vid = 'https://files.catbox.moe/js58k4.mp4'

let tags = {};
let emojis = {
  main: "🤍",
  info: "☁️",
  config: "⚙️",
  dl: "🫧",
  search: "🧋",
  ia: "🤖",
  ff: "👾",
  frases: "💞",
  converter: "🪾",
  tools: "🛠️",
  gc: "🌲",
  efectos: "🪻",
  fun: "🍿",
  game: "🕹️",
  anime: "🍬",
  maker: "🌷",
  logos: "🏝️",
  emox: "🪼",
  nsfw: "🍒",
  sticker: "⚡",
  rpg: "💸",
  rg: "🪴",
  owner: "☕"
};

const tagTitles = {
  main: "Menus",
  info: "Info",
  config: "Ajustes",
  dl: "Download",
  search: "Search",
  ia: "Inteligencias",
  ff: "Free Fire",
  frases: "Frases",
  converter: "Converters",
  tools: "Herramientas",
  gc: "Grupos",
  efectos: "Efectos",
  fun: "Diversión",
  game: "Juegos",
  anime: "Random",
  maker: "Maker",
  logos: "Logos",
  emox: "Gifs-Nsfw",
  nsfw: "Nsfw",
  sticker: "Sticker",
  rpg: "Rpg",
  rg: "Registro",
  owner: "Owner"
};

for (let key in emojis) {
  tags[key] = `「 *${tagTitles[key]}* 」 ${emojis[key]}`;
}

    let defaultMenu = {


    before: `ㅤㅤ   ꒰꛱ ͜ ꛱|꛱ ꛱͜ |꛱ ꛱͜ |꛱ ͜ ꛱|꛱ ͜ |୨🫧୧꛱|꛱ ꛱͜ |꛱ ꛱͜ |꛱ ͜ ꛱|꛱ ꛱͜ |꛱ ͜ ꒱
Ꮺ *H𐐫l⍺᳟ ࣪ ᦷᩘ${taguser}*
*Bienvenido/a*  ࣪  ⿻   al   ࣭  ෨
࣭   ✿  *Menú  de  JotaBot*  𓈒𓏸      ☁︎    
﹏͜͡ *${saludo}* ﹏͜͡

> ꒰꛱ ͜Desarrollado por *Dev.Criss 🇦🇱*
@${creadorN}

*𓈒𓏸🐼 \`𝖡𝗈𝗍𝖭𝖺𝗆𝖾:\`* ${botname}
*𓈒𓏸🌿 \`𝖴𝗉𝗍𝗂𝗆𝖾:\`* ${uptime}
*𓈒𓏸👥 \`𝖴𝗌𝖾𝗋𝗌:\`* ${totalreg}
*𓈒𓏸🍙 \`𝖵𝖾𝗋𝗌𝗂𝗈𝗇:\`* ${vs}

> ☕ 𝖲𝗂 𝖾𝗇𝖼𝗎𝖾𝗇𝗍𝗋𝖺 𝗎𝗇 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝖼𝗈𝗇 𝖾𝗋𝗋𝗈𝗋𝖾𝗌 𝗇𝗈 𝖽𝗎𝖽𝖾𝗌 𝖾𝗇 𝗋𝖾𝗉𝗈𝗋𝗍𝖺𝗋𝗅𝗈 𝖼𝗈𝗇 𝖾𝗅 𝖢𝗋𝖾𝖺𝖽𝗈𝗋
${readMore}
ㅤㅤ *乂 ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs 乂*
`,

      header: category => `╭──•${category}`,
      body: (cmd, emoji) => `│${emoji} ${cmd}`,
      footer: '╰──•',
      after: `> ${dev}`
  }

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
      }))

    let groupsByTag = {}
    for (let tag in emojis) {
      groupsByTag[tag] = help.filter(plugin => plugin.tags.includes(tag))
    }

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag =>
        [
          defaultMenu.header(tags[tag]),
          groupsByTag[tag].flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(usedPrefix + cmd, emojis[tag]))).join('\n'),
          defaultMenu.footer
        ].join('\n')
      ),
      defaultMenu.after
    ].join('\n')


   await conn.sendMessage(m.chat, {
    video: { url: vid },
    caption: menuText,
    mentions: [m.sender, creadorM],
    gifPlayback: true
  }, { quoted: fkontak })

  } catch (e) {
    console.error(e)
    await m.reply('*❌ Hubo un error al generar el menú.*')
  }
}


handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}