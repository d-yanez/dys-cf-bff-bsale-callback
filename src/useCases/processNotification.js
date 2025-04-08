// src/useCases/processNotification.js
const sendTelegramMessage = require('../infrastructure/telegramNotifier');

module.exports = (notificationData) => {
  try {
    // Lógica para procesar la notificación
    console.log('Procesando notificación en segundo plano:', notificationData);

    // Formatea el mensaje que deseas enviar a Telegram
    const message = `Nuevo evento recibido:\n${JSON.stringify(notificationData, null, 2)}`;

    // Envia la notificación a Telegram
    sendTelegramMessage(message);
  } catch (error) {
    console.error('Error en processNotification:', error);
  }
};
