import gplay from "google-play-scraper";
let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*${emojis} Ingresa el nombre de la app que quieras buscar.*\n> *Ejemplo:* WhatsApp`, m);
  }
  let res = await gplay.search({ term: text });
  if (!res.length) {
    return conn.reply(m.chat, "*⚠️ No se encontraron resultados, intenteb con otra busqueda*", m, rcanal); 
  }
  let opt = {
    contextInfo: {
      externalAdReply: {
        title: res[0].title,
        body: res[0].summary,
        thumbnail: (await conn.getFile(res[0].icon)).data,
        sourceUrl: res[0].url,
      },
    },
  };
  res = res.map(
    (v) =>
      `*🏷️ Resultado:* ${v.title}
       *🫧 Desarrollador:* ${v.developer}
       *💸 Precio:* ${v.priceText || "Gratis"}
       *📈 Puntuación:* ${v.scoreText || "Sin Puntuación"}
       *⛓️ Link:* ${v.url}`
  ).join("\n\n");
  conn.reply(m.chat, res, m, opt); 
};
handler.help = ['playstoresearch']; 
handler.tags = ['search'];
handler.command = /^(playstoresearch|pssearch)$/i; 
export default handler;