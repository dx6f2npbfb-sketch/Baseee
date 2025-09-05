let handler = async (m, { conn, command, text }) => {

    // Obtiene el usuario mencionado o el que respondió al mensaje
    let user = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : m.sender);
    let userName = user === m.sender ? `@${m.sender.split('@')[0]}` : `@${user.split('@')[0]}`;

    // Mensaje de respuesta
    const responseMessage = `*QUE CREES PUTITX* 

*Te descuidaste y te han metido todo el 🍆 dentro ${texto || userName}, mientras gemias cómo puta y pedías que te dieran más y más*

*${texto || userName}*
🥵*ya estás clavadx, solo te queda menearte`;

    // Envía la respuesta al chat
    conn.reply(m.chat, responseMessage, null, { mentions: [user] });
}

// Ayuda y configuración del comando
handler.help = ['penetrar'];
handler.tags = ['fun'];
handler.command = ['penetrar', 'penetrado'];
handler.group = true;
handler.fail = null;

export default handler;
