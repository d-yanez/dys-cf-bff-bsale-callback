class Notification {
    constructor(data) {
      this.data = data;
    }
  
    isValid() {
      // Ejemplo de validación: se puede ampliar según las reglas del dominio
      return this.data != null;
    }
  }
  
  module.exports = Notification;
  