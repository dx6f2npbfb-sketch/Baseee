let handler = async (m, { conn, text, isROwner, isOwner }) => {
    if (text) {
        global.db.data.chats[m.chat].setstock = text
        conn.reply(m.chat, '🕷️𝙇𝙤𝙨 𝙘𝙤𝙢𝙗𝙤𝙨 𝙙𝙚 𝙎𝙩𝙤𝙘𝙠 𝙝𝙖𝙣 𝙨𝙞𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙤𝙨.\n\n> MxdeBot', m)
    } else throw `🖤 𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙡𝙤𝙨 𝙘𝙤𝙢𝙗𝙤𝙨 𝙥𝙖𝙧𝙖 𝙜𝙪𝙖𝙧𝙙𝙖𝙧 𝙚𝙣 𝙚𝙡 𝙨𝙩𝙤𝙘𝙠.
> Ejemplo: .setstock Yancito el mejor bot 🕷️

> Yancito Bot`
}

handler.command = ['setstock']
handler.help = ['setstock']
handler.tags = ['ventas']
handler.admin = true
handler.group = true
export default handler