const handler = async (m, { conn }) => {


  conn.sendMessage(m.chat, {
text: `Hola ${club} aquí tienes el contacto de mi dueño\nJota🐼: +573155227977\n> escribe si quieres info del bot`,
}, { quoted: m });
};

handler.tags = ['info'];
handler.help = ['comprar'];
handler.command = ['Dueño', 'owner'];
export default handler;