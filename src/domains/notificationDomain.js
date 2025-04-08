const Notification = require('../entities/Notification');

module.exports = {
  createNotification: (data) => {
    const notification = new Notification(data);
    // Aquí se pueden agregar validaciones o transformaciones propias del dominio
    return notification;
  }
};
