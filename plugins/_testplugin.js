/*import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const xsticker = '❗'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*${xsticker} Por favor, ingresa un texto para realizar tu sticker.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Hello Word`, m)
  }

  m.react('⏳')

  try {
    let url = `https://brat.siputzx.my.id/gif?text=${encodeURIComponent(text)}`
    let res = await axios.get(url, { responseType: 'arraybuffer' })

    let contentType = res.headers['content-type']

    // A veces la API puede devolver 'image/webp' para stickers, aceptamos ese caso también
    if (
      !contentType || 
      (!contentType.startsWith('video/') && !contentType.startsWith('image/'))
    ) throw new Error('Error en la API: tipo de contenido inesperado.')

    let bratSticker = await sticker(res.data, null, global.packname, global.author)

    await conn.sendMessage(m.chat, { sticker: bratSticker }, { quoted: m })
    m.react('✅')

  } catch (err) {
    m.react('✖️')
    // Puedes agregar más detalles aquí si la respuesta tiene data para depurar
    m.reply(`✖️ Error en la API o fallo al generar el sticker.\n${err.message}`)
  }
}

handler.help = ['bratvid <texto>']
handler.command = ['bratvid2', 'bratv2']
handler.tags = ['sticker']

export default handler*/

/*
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (command === 'cambiar' || command === 'convertir' || command === 'moneda' || command === 'monedas') {
        // Handler para conversión de divisas
        const apiKey = '9f51309abe04626c88401dc9';

        try {
            if (args.length < 4 || args[2].toLowerCase() !== 'a') {
                m.reply(`⚠️ Uso incorrecto. Por favor, usa el formato:\n\`${usedPrefix}${command} [cantidad] [moneda_origen] a [moneda_destino]\`\nEjemplo: \`${usedPrefix}cambiar 100 USD a EUR\``);
                return;
            }

            const cantidad = parseFloat(args[0]);
            const monedaOrigen = args[1].toUpperCase();
            const monedaDestino = args[3].toUpperCase();

            if (isNaN(cantidad) || cantidad <= 0) {
                m.reply('⚠️ La cantidad debe ser un número positivo.');
                return;
            }

            const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${monedaOrigen}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.result !== 'success') {
                let errorMessage = '❌ No se pudo obtener la tasa de cambio.';
                if (data['error-type']) {
                    errorMessage += ` Error de la API: ${data['error-type'].replace(/_/g, ' ')}`;
                    if (data['error-type'] === 'unsupported-code') {
                        errorMessage += `\nVerifica que las monedas (${monedaOrigen} o ${monedaDestino}) sean códigos ISO válidos.`;
                    }
                }
                m.reply(errorMessage);
                return;
            }

            const rate = data.conversion_rates[monedaDestino];

            if (!rate) {
                m.reply(`❌ No se encontró la tasa de conversión para ${monedaDestino}.`);
                return;
            }

            const resultado = cantidad * rate;

            const mensaje = `📈 ${cantidad} *${monedaOrigen}* equivale a aproximadamente *${resultado.toFixed(2)} ${monedaDestino}*.\n_Tasas actualizadas al: ${new Date(data.time_last_update_utc).toLocaleString()}_`;

            conn.reply(m.chat, mensaje, m);

        } catch (error) {
            console.error(error);
            m.reply('❌ Ocurrió un error al procesar tu solicitud.');
        }
    } else if (command === 'divisas') {
        // Handler para mostrar lista de divisas
        const message = `
💱 *DIVISAS DE LATAM*
*┈┈┈┈┈┈┈┈┈┈┈┈┈┈*

PAÍS ┋ MONEDA
🇭🇳 ┋ HNL  
🇺🇸 ┋ USD
🇲🇽 ┋ MXN
🇨🇴 ┋ COP
🇨🇱 ┋ CLP
🇦🇷 ┋ ARS
🇵🇪 ┋ PEN
🇬🇹 ┋ GTQ
🇳🇮 ┋ NIO
🇨🇷 ┋ CRC
🇵🇦 ┋ PAB
🇵🇾 ┋ PYG
🇺🇾 ┋ UYU
🇩🇴 ┋ DOP
🇧🇴 ┋ BOB
🇧🇷 ┋ BRL
🇻🇪 ┋ VES

🌍 *DIVISAS DE EUROPA Y OTROS*
*┈┈┈┈┈┈┈┈┈┈┈*

🇪🇺 ┋ EUR (Euro)
🇬🇧 ┋ GBP (Libra esterlina)
🇨🇭 ┋ CHF (Franco suizo)
🇷🇺 ┋ RUB (Rublo ruso)
🇳🇴 ┋ NOK (Corona noruega)
🇸🇪 ┋ SEK (Corona sueca)
🇩🇰 ┋ DKK (Corona danesa)
🇵🇱 ┋ PLN (Zloty polaco)
🇹🇷 ┋ TRY (Lira turca)
🇯🇵 ┋ JPY (Yen japonés)
🇨🇦 ┋ CAD (Dólar canadiense)
🇦🇺 ┋ AUD (Dólar australiano)
🇳🇿 ┋ NZD (Dólar neozelandés)
`;
        await conn.reply(m.chat, message, m);
    }
};

handler.help = [
    'cambiar <cantidad> <moneda_origen> a <moneda_destino>',
    'convertir <cantidad> <moneda_origen> a <moneda_destino>',
    'divisas'
];
handler.tags = ['herramientas'];
handler.command = ['cambiar', 'convertir', 'divisas', 'moneda', 'monedas' ];

export default handler;*/



// Mejorado por Criss Escobar

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('*⚠️ Ingresa el enlace de un grupo.*')

    try {
        let [_, code] = text.match(linkRegex) || []
        if (!code) return m.reply('*⚠️ Enlace inválido.*')

        // obtenemos el id del grupo a partir del link
        let res = await conn.groupGetInviteInfo(code).catch(() => null)
        if (!res || !res.id) return m.reply('*❌ No se pudo obtener información del grupo.*')

        let groupId = res.id

        // verificamos si el bot está en ese grupo
        if (!(groupId in conn.chats)) {
            return m.reply('*ℹ️ El bot no está en este grupo.*')
        }

        // salir del grupo
        await conn.groupLeave(groupId)
        m.reply(`*✅ ${botname} salió del grupo correctamente.*`)

    } catch (e) {
        console.error(e)
        return m.reply('*✖️ Ocurrió un error al intentar salir del grupo.*')
    }
}

handler.help = ['salirgc <link>']
handler.tags = ['owner']
handler.command = /^salirgc$/i
handler.rowner = true
handler.private = true

export default handler