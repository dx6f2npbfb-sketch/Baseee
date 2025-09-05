import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  await m.react('${emojis});

  let list = [
    {
      displayName: "Chinchu dzn",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Chinchu\nitem1.TEL;waid=5493855789747:5493855789747\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:team.sunflare@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/nee\nitem3.X-ABLabel:Instagram\nitem4.ADR:;; Argentina 🇦🇷;;;;\nitem4.X-ABLabel:País\nEND:VCARD` },
    {

  ];

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contactos`,
      contacts: list
    }
  }, { quoted: estilo });
};

handler.help = ['creador', 'dueño'];
handler.tags = ['info'];
handler.command = /^(owner|creador|creator|dueño|desarrollador)$/i;

export default handler;