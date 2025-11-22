let handler = async (m, { conn, text }) => {
  if (!text) {
    return await conn.reply(
      m.chat,
      '⚠️ Debes escribir el nuevo nombre que quieres asignar al bot.\n\nEjemplo: *.setnamebot MiBotCaribe*',
      m
    )
  }

  try {
    await conn.updateProfileName(text)
    await conn.sendMessage(
      m.chat,
      { text: `✅ Nombre del bot actualizado correctamente a: *${text}*` },
      { quoted: m }
    )
  } catch (e) {
    await conn.reply(
      m.chat,
      '❌ Ocurrió un error al intentar actualizar el nombre del bot.',
      m
    )
    console.error(e)
  }
}

handler.tags = ['owner']
handler.help = ['setnamebot <nuevo nombre>']
handler.command = ['setnamebot', 'cambiarnombrebot']
handler.owner = true

export default handler