let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setpago) {
        let pago = chat.setpago;
        await conn.reply(m.chat, pago, m);
    } else {
        m.reply(`🖤 𝙉𝙤 𝙨𝙚 𝙝𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙙𝙤 𝙢𝙚𝙩𝙤𝙙𝙤 𝙙𝙚 𝙥𝙖𝙜𝙤, 𝙪𝙩𝙞𝙡𝙞𝙯𝙖 .𝙨𝙚𝙩𝙥𝙖𝙜𝙤 𝙥𝙖𝙧𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧 𝙪𝙣𝙤.\n\n> YancitoBot`);
    }
}
handler.command = ['pago'];
handler.help = ['pago']
handler.tags = ['ventas']
handler.group = true;
export default handler;
