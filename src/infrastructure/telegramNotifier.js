// src/infrastructure/telegramNotifier.js
async function sendTelegramMessage(message) {
    const telegramToken = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
  
    if (!telegramToken || !chatId) {
      console.error('Variables de entorno TELEGRAM_TOKEN o TELEGRAM_CHAT_ID no definidas.');
      return;
    }
  
    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      });
      const data = await response.json();
      if (!data.ok) {
        throw new Error(`Error en la API de Telegram: ${data.description}`);
      }
      console.log(`Mensaje enviado a Telegram exitosamente. Description: ${data.description}`);
    } catch (error) {
      console.error('Error enviando mensaje a Telegram:', error);
    }
  }
  
  module.exports = sendTelegramMessage;
  