# 📅 MeetingsADRES - Gestor de Reuniones

Aplicación web para gestionar reuniones diarias con integración a Microsoft Teams, transcripciones, resúmenes y generación de podcasts.

## 🚀 Características

- 📅 Calendario visual elegante con fondo oscuro
- 📝 Registro de reuniones con detalles completos
- ✉️ Envío de invitaciones por correo
- 👥 Seguimiento de invitados
- 🔗 Acceso directo a reuniones de Teams
- 🎙️ Transcripciones automáticas
- 📑 Generación de resúmenes
- 🎧 Creación de podcasts en español
- 📋 Registro de información detallada (temas, participantes, acuerdos, tareas)
- 🌐 Despliegue sencillo con Vercel

## 🛠️ Tecnologías

- **Frontend**: Next.js 14 con React 18
- **Backend**: API Routes de Next.js
- **Base de datos**: MongoDB Atlas
- **Autenticación**: NextAuth.js
- **UI**: Tailwind CSS
- **Integración con Microsoft Teams**: API de Microsoft Graph
- **Generación de podcasts**: APIs de texto a voz

## 🚀 Despliegue en Vercel

La forma más sencilla de desplegar esta aplicación es usando [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

[![Deploy con Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftu-usuario%2Fmeetings-adres&project-name=meetings-adres&repository-name=meetings-adres)

### Pasos manuales:

1. **Preparar el repositorio**
   ```bash
   # Clonar el repositorio
   git clone https://github.com/tu-usuario/meetings-adres.git
   cd meetings-adres
   ```

2. **Configurar variables de entorno**
   - Copiar `.env.example` a `.env.local`
   - Completar las variables necesarias

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en http://localhost:3000

## 🔧 Configuración

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Microsoft Graph API
NEXT_PUBLIC_MSAL_CLIENT_ID=tu_client_id
MSAL_CLIENT_SECRET=tu_client_secret
NEXT_PUBLIC_MSAL_AUTHORITY=https://login.microsoftonline.com/tu_tenant_id
NEXT_PUBLIC_MSAL_REDIRECT_URI=http://localhost:3000/auth/callback

# MongoDB
MONGODB_URI=tu_cadena_conexion_mongodb

# URL de la aplicación
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_aleatorio
```

## 📦 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en producción
- `npm run lint` - Ejecuta el linter

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios propuestos.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más información.
# meetings-adres
