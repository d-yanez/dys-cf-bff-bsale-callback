// src/useCases/processNotification.js
const { PubSub } = require('@google-cloud/pubsub');
const winston = require('winston');
const sendTelegramMessage = require('../infrastructure/telegramNotifier');

// Inicialización de PubSub y Logger
const pubsub = new PubSub();
const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});

/**
 * Procesa la notificación entrante de Bsale
 * - Envía siempre notificación a Telegram
 * - Reenvía al topic-bsale-webOrder sólo si topic==='webOrder'
 * - Loguea messageId
 */
module.exports = async function processNotification(notificationData) {
  try {
    // 1) Notificación a Telegram
    const message = `Nuevo evento recibido:\n${JSON.stringify(notificationData, null, 2)}`;
    sendTelegramMessage(message);
    logger.info('Telegram message sent');

    // 2) Re-publicación condicional a Pub/Sub
    if (notificationData.topic === 'webOrder' && typeof notificationData.resourceId === 'string') {
      const payload = {
        topic: notificationData.topic,
        resourceId: notificationData.resourceId,
      };
      const dataBuffer = Buffer.from(JSON.stringify(payload));

      // Publicar mensaje y capturar messageId
      const messageId = await pubsub.topic('topic-bsale-webOrder').publishMessage({ data: dataBuffer });
      logger.info(`Message forwarded to topic-bsale-webOrder: resourceId=${notificationData.resourceId}, messageId=${messageId}`);
    } else {
      logger.info(`Skipping Pub/Sub for topic=${notificationData.topic}`);
    }
  } catch (error) {
    logger.error('Error en processNotification:', error);
    // No lanzamos error para no romper el flujo
  }
};
