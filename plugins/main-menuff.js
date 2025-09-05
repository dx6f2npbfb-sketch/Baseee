let handler = async (m, { conn, usedPrefix: _p }) => {

  let usertag = '@' + m.sender.split('@')[0]
  const vid = 'https://files.catbox.moe/c64bvm.mp4'

  let tags = {
    "list": "「 *Listas* 」📑",
    "select": "「 *Select* 」🎮"

  }

  let emojis = {
    "list": "📑",
    "select": "🎮"
  }

  let defaultMenu = {
    before: `╔═══════《🎮》═══════╗
     〘 Menú-Logos 〙
╚═══════《👾》═══════╝
 「 👋Hola ${usertag}👋 」
> ${saludo}\n
> \`\`\`${fechaHora}\`\`\`
`,

    header: category => `╭───‧₊˚✧[${category}]✧˚₊‧`,
    body: (cmd, emoji) => `𓉘${emoji} ➺ ${cmd}`,
    footer: '╰──✧',
    after: `> ${dev}`
  }

// ---[ AGRUPACIÓN CMDS X TAGS ]---
  let help = Object.values(global.plugins)
    .filter(plugin => !plugin.disabled)
    .map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
    }))

  let groups = {}
  for (let tag in emojis) {
    groups[tag] = help.filter(plugin => plugin.tags.includes(tag))
  }

// ---[ CONTRUCCIÓN DEL TXT ]---
  let text = [
    defaultMenu.before,
    ...Object.keys(tags).map(tag =>
      [
        defaultMenu.header(tags[tag]),
        groups[tag].flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(_p + cmd, emojis[tag]))).join('\n'),
        defaultMenu.footer
      ].join('\n')
    ),
    defaultMenu.after
  ].join('\n')

  await m.react('🎮')
  await conn.sendMessage(m.chat, {
    video: { url: vid },
    caption: text,
    mentions: [m.sender],
    gifPlayback: true
  }, { quoted: fkontak })
}

handler.tags = ['main']
handler.help = ['menulogos']
handler.command = /^(menuff|comandosff|ffmenu)$/i;
handler.fail = null;

export default handler