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

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*ℹ️ Ingresa un número de DNI*\n> *\`💡 Ejemplo:\`* ${usedPrefix}${command} 46027897`);

    // Verificar que el texto sea numérico y tenga 8 dígitos (longitud típica del DNI en Perú)
    if (!/^\d{8}$/.test(text)) return m.reply('Por favor ingresa un número de DNI válido (8 dígitos).');

    // Enviar un "react" mientras se procesa la solicitud
    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    // Obtener el token de la API desde las variables de entorno
    const token = process.env.RENIEC_API_TOKEN; // Asegúrate de definir esta variable en tu entorno

    if (!token) {
        return m.reply('No se ha encontrado el token de la API. Por favor, verifica la configuración.');
    }

    try {
        // Realizar la solicitud a la API de RENIEC para obtener los datos del DNI
        let response = await fetch(`https://api.apis.net.pe/v2/reniec/dni?numero=${text}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Referer': 'https://apis.net.pe/consulta-dni-api'
            }
        });

        // Verificar si la respuesta fue exitosa (código 200)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error de la API: ${errorData.message || 'Desconocido'} (Código: ${response.status})`);
        }

        // Obtener la respuesta en formato JSON
        let data = await response.json();

        // Verificar si la API devuelve un error o si no contiene datos
        if (data.error || !data.nombres) {
            return m.reply('No se encontraron datos para este DNI o el DNI no es válido.');
        }

        // Extraer la información relevante de la respuesta
        const nombre = data.nombres;
        const apellidos = `${data.apellidoPaterno || ''}${data.apellidoPaterno && data.apellidoMaterno ? ' ' : ''}${data.apellidoMaterno || ''}`;
        const fechaNacimiento = data.fechaNacimiento;

        // Formatear el mensaje para enviar los datos del DNI
        let message = `*💫 Datos del DNI ${text}:*\n`;
        message += `*Nombre:* ${nombre}\n`;
        message += `*Apellidos:* ${apellidos}\n`;
        message += `*Fecha de Nacimiento:* ${fechaNacimiento}`;

        // Enviar los datos del DNI al usuario
        await conn.sendMessage(m.chat, message);

        // Enviar una reacción de "check" cuando se complete la solicitud
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al obtener los datos:', error.message);
        m.reply('Hubo un problema al obtener los datos, intenta de nuevo más tarde. Error: ' + error.message);
    }
}

// Definición del comando y ayuda
handler.help = ['dnidox *<dni>*'];
handler.tags = ['información'];
handler.command = /^(dnidox)$/i;
handler.premium = false;
handler.rowner = true;
handler.register = true;

export default handler;