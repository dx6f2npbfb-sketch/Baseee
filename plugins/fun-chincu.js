const handler = async (m, { conn }) => {


  conn.sendMessage(m.chat, {
text: `Mi dueña es Chinchu dzn y el dueño de ella es Jota🐼🥵`,
}, { quoted: fkontak });
};

handler.tags = ['fun'];
handler.help = ['fun'];
handler.command = ['chinchu'];
export default handler;