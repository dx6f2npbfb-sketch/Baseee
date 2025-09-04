

import fetch from 'node-fetch'

var handler = async (m, { conn, usedPrefix, command, args }) => {
    if (!args[0]) {
        return await conn.reply(m.chat, `*${emojis} Ingresa una url válida de TikTok.*
> ejemplo: https://vt.tiktok.com/ZSA7hA582/`, m);
    }

    if (!args[0].match(/(https?:\/\/)?(www\.)?(vm\.|vt\.)?tiktok\.com\//)) {
        return await m.reply(`*⚠️ El enlace ingresado no es válido. Asegúrate de que sea un link de TikTok.*`);
    }

    try {
        await m.react('⏳');

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data) {
            return await m.reply("*❌ Error al obtener datos de la API.*");
        }

        const { play, wmplay, title } = tiktokData.data;
        const videoURL = play || wmplay;
        const info = `*Download - Tiktok*\n\n> ${title || 'Sin descripción'}`;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", info, m);
            await m.react('✅');
        } else {
            return await m.reply("*✖️ No se pudo descargar el video.*");
        }

    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `*✖️ Error:* ${error.message || error}`, m);
        await m.react('✖️');
    }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = /^(tt|tiktok|tk|tiktokdl|ttdl|tiktokv|ttv|tkv)$/i;

export default handler;

async function tiktokdl(url) {
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const res = await fetch(api);
    return await res.json();
}