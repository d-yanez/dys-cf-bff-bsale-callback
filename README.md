# dys-cf-bff-bsale-callback

## Descripción
Microservicio en Node.js 20 diseñado como una Cloud Function en GCP. Este servicio expone un endpoint POST `/callback` para recibir notificaciones (webhooks) desde bsale y, en el futuro, orquestar otros servicios. Se implementa usando Clean Architecture para separar responsabilidades.

## Estructura del Proyecto

   ```bash

      dys-cf-bff-bsale-callback/
      ├── src/
      │   ├── entities/
      │   │   └── Notification.js
      │   ├── domains/
      │   │   └── notificationDomain.js
      │   ├── infrastructure/
      │   │   ├── controllers/
      │   │   │   └── notificationController.js
      │   │   └── routes/
      │   │       └── index.js
      │   ├── useCases/
      │   │   └── processNotification.js
      │   └── app.js
      ├── index.js
      ├── package.json
      ├── .gitignore
      └── README.md
```bash


## Instalación
1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Despliegue en GCP
1. Asegúrate de tener configurado el [SDK de Google Cloud](https://cloud.google.com/sdk/docs/install).
2. Autentícate en GCP:  
3. Selecciona el proyecto:  
    gcloud config set project <TU_PROJECT_ID>
4. Despliega la Cloud Function (asegúrate de que el runtime sea Node.js 20):


## Variables de Entorno
Todas las variables se recibirán mediante `process.env`. Puedes configurarlas en GCP o en un archivo `.env` (para desarrollo) y luego ignorar dicho archivo en `.gitignore`.

## Uso y Logs
- El endpoint `/callback` acepta peticiones POST.
- Registra en consola el contenido del JSON recibido.
- Utiliza `setImmediate` para procesar en segundo plano (para futuras implementaciones).
- Responde con un status 200 y un JSON:  
```json
{ "msg": "Order notification received" }

## TELEGRAM
    https://api.telegram.org/bot<TELEGRAM_TOKEN>/getUpdates

## Test Local

npm install @google-cloud/functions-framework
"scripts": {
  "start": "functions-framework --target=app --port=8081"
}
