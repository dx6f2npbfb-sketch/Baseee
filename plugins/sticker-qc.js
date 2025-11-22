/* Mejorado por Jota */

import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const handler = async (m, { conn, args, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "🎭 *Ingrese un texto para realizar su sticker quotly.*\n\n> Ejemplo: .qc Hola mundo.";

    if (!text) return conn.reply(m.chat, '🎭 *Ingrese un texto para realizar su sticker quotly.*\n\n> Ejemplo: .qc Hola mundo.', m)
    if (text.length > 30) return conn.reply(m.chat, '> Máximo 30 caracteres, no es una biblia hijo.', m)

    // 🎨 Paleta de colores disponibles
    const colors = [
        { name: 'Negro', hex: '#000000' },
        { name: 'Blanco', hex: '#FFFFFF' },
        { name: 'Rojo', hex: '#FF0000' },
        { name: 'Verde', hex: '#00FF00' },
        { name: 'Azul', hex: '#0000FF' },
        { name: 'Amarillo', hex: '#FFFF00' },
        { name: 'Magenta', hex: '#FF00FF' },
        { name: 'Cyan', hex: '#00FFFF' },
        { name: 'Naranja', hex: '#FFA500' },
        { name: 'Púrpura', hex: '#800080' }
    ]

    // Si el usuario aún no eligió color, mostramos botones
    if (!args[1]) {
        const sections = [{
            title: "🎨 Elige un color",
            rows: colors.map(c => ({
                title: c.name,
                rowId: `${command} ${text} ${c.hex}`,
                description: `Generar sticker con fondo ${c.name}`
            }))
        }]

        return conn.sendMessage(m.chat, {
            text: `🎭 Texto: *${text}*\n\nElige el color para tu sticker:`,
            footer: '> Jota Bot IA',
            title: 'Jota AI',
            buttonText: 'Seleccionar color',
            sections
        }, { quoted: m })
    }

    // Si ya viene con color elegido
    const apiColor = args[1]

    const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png');

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": apiColor,
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": m.name,
                "photo": {
                    "url": pp
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };

    const json = await axios.post('https://btzqc.betabotz.eu.org/generate', obj, {
        headers: { 'Content-Type': 'application/json' }
    });

    const buffer = Buffer.from(json.data.result.image, 'base64');
    const stiker = await sticker(buffer, false, global.stickpack, global.stickauth);
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotely.webp', '', m);
}

handler.help = ['quotly *<texto>*']
handler.tags = ['sticker']
handler.command = ['quotly', 'qc']

export default handler