import fs from 'fs';

const handler = (m) => m;

handler.all = async function (m) {
  const chat = global.db.data.chats[m.chat];
  if (chat?.isBaneed) return;

  if (/^@+5493855789747$/i.test(m.text)) {
    conn.reply(m.chat, `*✦━━━★━━━✦*
🚫 *Prohibido mencionar a mi dueña*
😤 *¡Deja De Joder La Concha De La Lora!* 🇦🇷
*✦━━━★━━━✦*`, m);
    return !0;
  }
};

export default handler;
