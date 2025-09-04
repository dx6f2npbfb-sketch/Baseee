let handler = async (m, { conn }) => {

  let groupName = '';
  if (m.isGroup) {
    try {
      const metadata = await conn.groupMetadata(m.chat);
      groupName = metadata.subject || 'Sunflare';
    } catch (e) {
      groupName = 'Sunflare';
    }
  }

  const fecha = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const gdc = `
*Fecha:* ${fecha}
\`\`\`₊ PARTICIPACIÓN EN GUERRA DE CLANES🔥\`\`\`
*Hora:*
⏰🇵🇪: 5 PM hasta 9 PM
⏰🇦🇷: 7 PM hasta 11 PM

» *PARTICIPANTES:*
ㅤ
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊ 
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊ 
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊ 
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊ 
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊ 
┊👑 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊🕷️ ➤ 
┊ 
┊👑 ➤ 
┊🔱 ➤ 
┊⚜️ ➤ 
┊⚜️ ➤ 
┊ 
┊ 
╰─────────────╯
✨ *${groupName.toUpperCase()}* ✨`;

  if (m.isGroup) {
    await conn.sendMessage(m.chat, { text: gdc }, { quoted: fkontak });
  }
};

handler.help = ['gdc'];
handler.tags = ['ff', 'list'];
handler.command = ['gdc', 'guerradeclanes'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;