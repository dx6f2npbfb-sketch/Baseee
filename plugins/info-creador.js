
import fetch from "node-fetch";

let handler = async (m, { conn, command }) => {
    
    if (command === 'Dueño') {
        let username = await conn.getName(m.sender);

        await conn.sendMessage(m.chat, {
            text: `👤 *Hola ${username}*\n\nAquí tienes el contacto del dueño para adquirir el bot *${botname}*.\nPuedes escribirle para más detalles.`
        }, { quoted: m });

        // Enviar contacto
        let list = [{
            displayName: "Chinchu",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: Chinchu\nitem1.TEL;waid=5493855789747:5493855789747\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: novaspark.community@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/nohayxd\nitem3.X-ABLabel:Instagram\nitem4.ADR:;; Argentina 🇦🇷;;;;\nitem4.X-ABLabel:Región\nEND:VCARD`,
        }];

        await conn.sendMessage(m.chat, {
            contacts: {
                displayName: `${list.length} Contacto`,
                contacts: list
            }
        }, { quoted: m });

        return;
    }

    ];

    await conn.sendMessage(
        m.chat,
        {
            caption: botname,
            footer: dev,
            viewOnce: true
        },
        { quoted: m }
    );
};

handler.help = ["precios", "vendedor"];
handler.tags = ["info"];
handler.command = /^(precios|vendedor)$/i;

export default handler;