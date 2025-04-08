const processNotification = require('../../useCases/processNotification');

exports.handleCallback = async (req, res) => {
  try {
    // Imprime el mensaje recibido para tracking
    console.log('Notificación recibida de bsale:', req.body);
    //console.log(req.body);

    // Procesa la notificación en segundo plano
    setImmediate(() => {
        try {
          console.log('Tipo de processNotification:', typeof processNotification);
          processNotification(req.body);
        } catch (err) {
          console.error('Error procesando la notificación en segundo plano:', err);
        }
    });

    // Responde inmediatamente con status 200 y mensaje
    res.status(200).json({ msg: 'Order notification received' });
  } catch (error) {
    console.error('Error en handleCallback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
