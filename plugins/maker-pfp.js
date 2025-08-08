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
        return conn.reply(m.chat, `*${emojis} Debes responder a un mensaje, etiquetar a un usuario o ingresar un número válido.*`, m, rcanal);
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

  // 1. Si se pasa un número por texto (ej: .pfp 51987654321)
  if (args.length > 0) {
    let input = args.join('').replace(/\D/g, '');
    if (input.length < 8) return m.reply('*✖️ Número inválido. Asegúrate de ingresar un número completo.*');

    let exists = await conn.onWhatsApp(input + '@s.whatsapp.net');
    if (!exists || !exists[0]?.exists) {
      return m.reply(`✖️ *El número +${input} no está registrado en WhatsApp.*`);
    }

    who = exists[0].jid;
  } else {
    // 2. Detectar correctamente el JID evitando LIDs

    // Si fue un mensaje citado
    if (m.quoted?.participant) {
      who = m.quoted.participant; // usa el JID real del citado
    }

    // Si fue mención válida
    else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
      who = m.message.extendedTextMessage.contextInfo.mentionedJid[0]; // JID real de la mención
    }

    // Fallback si no se encuentra
    else {
      return conn.reply(m.chat, '*⚠️ Debes mencionar a un usuario, responder a un mensaje o ingresar un número válido.*', m);
    }
  }

  // Obtener nombre
  let name;
  try {
    name = await conn.getName(who);
  } catch {
    name = who.split('@')[0];
  }

  // Construir @ para mostrar
  const taguser = '@' + who.split('@')[0];

  // Intentar obtener la foto
  try {
    let pp = await conn.profilePictureUrl(who, 'image');
    await conn.sendFile(m.chat, pp, 'profile.jpg', `🖼️ *Foto de perfil de ${taguser}*`, m);
  } catch (e) {
    await m.reply(`⚠️ *El usuario ${taguser} no tiene foto de perfil o no se pudo obtener.*`);
  }
};

handler.help = ['pfp'];
handler.tags = ['maker'];
handler.command = ['pfp'];

export default handler;