import fs from 'fs'
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

    await m.react('🕷️')

    const img = `https://files.catbox.moe/84curn.jpg`

let tags = {};
let emojis = {
  main: "🕷️",
  info: "🗒️",
  config: "⚙️",
  dl: "🔽",
  search: "🔎",
  ia: "🤖",
  ff: "🕹️",
  frases: "✍️",
  converter: "🔄",
  tools: "🛠️",
  gc: "👾",
  efectos: "🪻",
  fun: "😂",
  game: "🎯",
  anime: "🍬",
  maker: "🌷",
  logos: "🏝️",
  emox: "🪼",
  nsfw: "🥵",
  sticker: "⚡",
  rpg: "💸",
  rg: "🪴",
  owner: "🤓"
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


    before: `---------🕷️𝐌𝐄𝐍𝐔 𝐘𝐀𝐍𝐂𝐈𝐓𝐎🕷️ ---------
• 𝙷𝚘𝚕𝚊 ${taguser} 👋
• ${saludo}\n
${readMore}
ㅤㅤ *✨ 𝗟𝗶𝘀𝘁𝗮 𝗱𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼𝘀 ✨*
`,

      header: category => `╭┈┈ ๑❀๑${category}`,
      body: (cmd, emoji) => `│${emoji} ${cmd}`,
      footer: '╰──๑❀๑',
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