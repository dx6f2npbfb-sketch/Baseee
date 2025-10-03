let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setstock) {
        let stock = chat.setstock;
        await conn.reply(m.chat, stock, m);
    } else {
        m.reply(`🥷 𝙉𝙤 𝙨𝙚 𝙝𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙙𝙤 𝙪𝙣 𝙘𝙖𝙩á𝙡𝙤𝙜𝙤 𝙥𝙖𝙧𝙖 𝙎𝙩𝙤𝙘𝙠, 𝙪𝙩𝙞𝙡𝙞𝙯𝙖 .𝙨𝙚𝙩𝙨𝙩𝙤𝙘𝙠 𝙥𝙖𝙧𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧 𝙪𝙣𝙤.\n\n> YancitoBot`);
    }
}
handler.command = ['stock'];
handler.help = ['stock']
handler.tags = ['ventas']
handler.group = true;
export default handler;