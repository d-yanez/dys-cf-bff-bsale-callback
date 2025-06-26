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
npm start

0) run env -> source env.sh
1) con esto enviamos un mensaje de prueba
curl -i -X POST http://localhost:8081/callback \
  -H "Content-Type: application/json" \
  -d '{"topic":"webOrder","resourceId":"test123"}'

2) luego con esto hacemos pull de msg:
gcloud pubsub subscriptions pull sub-bsale-webOrder \
  --limit=1 \
  --auto-ack
3) ejemplo de salida:


┌─────────────────────────────────────────────┬───────────────────┬──────────────┬────────────┬──────────────────┬────────────┐
│                     DATA                    │     MESSAGE_ID    │ ORDERING_KEY │ ATTRIBUTES │ DELIVERY_ATTEMPT │ ACK_STATUS │
├─────────────────────────────────────────────┼───────────────────┼──────────────┼────────────┼──────────────────┼────────────┤
│ {"topic":"webOrder","resourceId":"test123"} │ 15332468850710657 │              │            │                  │ SUCCESS    │
└─────────────────────────────────────────────┴───────────────────┴──────────────┴────────────┴──────────────────┴────────────┘

4) para purgar:
# Ajusta el límite a un número suficientemente grande para vaciar la cola
gcloud pubsub subscriptions pull sub-bsale-webOrder \
  --limit=1000 \
  --auto-ack \
  --project=<TU_PROJECT_ID>

5) deploy prod:
gcloud auth login
gcloud config set project <TU_PROJECT_ID>
gcloud functions deploy dys-cf-bff-bsale-callback \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region=us-central1 \
  --env-vars-file=.env.yaml \
  --entry-point=app


Para ver logs de arranque y errores, puedes ejecutar:
gcloud functions logs read dys-cf-bff-bsale-callback --limit=50
