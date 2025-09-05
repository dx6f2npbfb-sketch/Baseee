/* 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗦𝗵𝗮𝗱𝗼𝘄'𝘀 𝗖𝗹𝘂𝗯 🌺᭄
𝖢𝗋𝖾𝖺𝖽𝗈 𝗉𝗈𝗋 𝖣𝖾𝗏.𝖢𝗋𝗂𝗌𝗌 🇦🇱
https://whatsapp.com/channel/0029VauTE8AHltY1muYir31n*/
/*

let handler = async (m, { conn, args }) => {
    let who;

    if (args.length > 0) {
        let input = args.join('').replace(/\D/g, '');
        if (input.length < 8) return m.reply('*✖️ Número inválido. Asegúrate de ingresar un número completo.*');

        let exists = await conn.onWhatsApp(input + '@s.whatsapp.net');
        if (!exists || !exists[0]?.exists) {
            return m.reply(`✖️ *El número +${input} no está registrado en WhatsApp.*`);
        }

        who = exists[0].jid;
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else if (m.mentionedJid?.[0]) {
        who = m.mentionedJid[0];
    } else {
        return conn.reply(m.chat, `*${emojis} Debes responder a un mensaje, etiquetar a un usuario o ingresar un número válido.*`, m);
    }

    let name;
    try {
        name = await conn.getName(who);
    } catch {
        name = who.split('@')[0];
    }

    try {
        let pp = await conn.profilePictureUrl(who, 'image');
        await conn.sendFile(m.chat, pp, 'profile.jpg', `🖼️ *Foto de perfil de \`${name}\`*`, m);
    } catch (e) {
        await m.reply(`⚠️ *El usuario \`${name}\` no tiene foto de perfil o no se pudo obtener.*`);
    }
};

handler.help = ['pfp'];
handler.tags = ['maker'];
handler.command = ['pfp'];

export default handler;*/
let handler = async (m, { conn, args }) => {
    let who;

    // 🔹 Si responde a un mensaje, usar ese JID directamente
    if (m.quoted) {
        who = m.quoted.sender;
    }
    // 🔹 Si hay menciones, tomar el JID directamente (sin procesar como número)
    else if (m.mentionedJid?.length) {
        who = m.mentionedJid[0];
    }
    // 🔹 Si no, se valida número manualmente
    else if (args.length > 0) {
        let input = args.join('').replace(/\D/g, '');
        if (input.length < 8) {
            return m.reply('*no sirve bro toca mimir creo 👌🏻*');
        }

        // ✅ Probar con JID normal y LID
        let candidates = [input + '@s.whatsapp.net', input + '@lid'];
        let exists;
        for (let jid of candidates) {
            let res = await conn.onWhatsApp(jid).catch(() => null);
            if (res?.[0]?.exists) {
                exists = res[0];
                break;
            }
        }

        if (!exists) {
            return m.reply(`✖️ *El número +${input} no está registrado en WhatsApp.*`);
        }

        who = exists.jid;
    } else {
        return conn.reply(m.chat, `*${emojis} Debes responder a un mensaje, etiquetar a un usuario o ingresar un número válido.*`, m, rcanal);
    }

    // 🏷️ Obtener nombre del usuario
    let name;
    try {
        name = await conn.getName(who);
    } catch {
        name = who.split('@')[0];
    }

    // 🖼️ Intentar obtener foto de perfil
    try {
        let pp = await conn.profilePictureUrl(who, 'image');
        await conn.sendFile(m.chat, pp, 'profile.jpg', `🖼️ *Foto de perfil de \`${name || 'Usuario'}\`*`, m);
    } catch {
        await m.reply(`⚠️ *El usuario \`${name || 'Gatita grr'}\` no tiene foto de perfil o no se pudo obtener.*`);
    }
};

handler.help = ['pfp'];
handler.tags = ['maker'];
handler.command = ['pfp'];

export default handler;