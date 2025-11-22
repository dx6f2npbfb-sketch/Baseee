import fs from 'fs';

const filePath = './personalize.json';

let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: '💫', key: m.key } });

  if (!text) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    return m.reply('✨ Onii-chan, porfa dime qué nombre quieres para mí~ 💖');
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath));
  } catch {
    data = {};
  }

  // Usa el ID del dueño como clave
  const ownerID = m.sender;
  if (!data[ownerID]) {
    data[ownerID] = {
      botName: null,
      currency: null,
      videos: []
    };
  }

  data[ownerID].botName = text.trim();

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key } });
  m.reply(`🌟 ¡Listo, mi querido amo! Ahora me llamaré *${text.trim()}* solo para ti 💕`);
};

handler.help = ['cambiarnombreBot <nuevo nombre>', 'nombrebot <nuevo nombre>'];
handler.tags = ['config'];
handler.command = /^(cambiarnombreBot|nombrebot)$/i;
handler.owner = true;

export default handler;