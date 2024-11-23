
# **Discord Bot**

Este proyecto es un bot de Discord modular y extensible que ofrece múltiples funcionalidades para la administración y dinamización de servidores. Actualmente, incluye una funcionalidad para asignar roles automáticamente según la posición en un medallero, con la posibilidad de añadir muchas más funcionalidades en el futuro.

## **Características**
- **Asignación de roles por medallero**: Automatiza la asignación de roles según la posición en un medallero.
- **Modular y Escalable**: Diseñado para agregar fácilmente nuevas características.
- **API REST**: Exposición de endpoints para interactuar con el bot desde aplicaciones externas.
- **Dockerizado**: Preparado para un despliegue sencillo y eficiente.
- **Eventos de Discord**: Manejo de eventos clave como mensajes, interacciones y actualizaciones de usuarios.

---

## **Requisitos**

- Node.js v18 o superior
- Docker (opcional, para ejecutar en contenedores)
- Token del bot de Discord

---

## **Instalación Local**

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/yrtomas/discord-bot.git
   cd discord-bot
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```plaintext
   DISCORD_TOKEN=TU_BOT_TOKEN
   PORT=3000
   ```

4. **Ejecutar el bot**:
   ```bash
   node src/index.js
   ```

---

## **Ejecutar con Docker**

1. **Construir la imagen Docker**:
   ```bash
   docker build -t discord-bot .
   ```

2. **Ejecutar el contenedor**:
   ```bash
   docker run -d --name discord-bot -p 3000:3000 --env-file .env discord-bot
   ```

3. **(Opcional) Usar Docker Compose**:
   ```bash
   docker-compose up --build
   ```

---

## **Endpoints Disponibles**

### **POST /updateLeaderboard**
**Descripción**: Actualiza los roles en Discord según el medallero.

**Contrato**:
```json
{
  "guildId": "string",          // ID del servidor de Discord
  "leaderboard": [
    { "userId": "string" }      // ID del usuario en Discord
  ]
}
```

**Respuesta Exitosa**:
- **Código**: `200 OK`
- **Cuerpo**: `"Roles actualizados según el medallero."`

**Errores**:
- **Código**: `400 Bad Request`
  - Razón: Falta el `guildId` o el `leaderboard` no es válido.
- **Código**: `500 Internal Server Error`
  - Razón: Error al asignar roles o al conectarse al servidor.
**Pre-requisito**:
  - Un servidor de Discord con los roles configurados para la funcionalidad de medallero:
  - 🥇 Líder
  - 🥈 Subcampeón
  - 🥉 Tercer Lugar
  - 💪 Participante Destacado

---

## **Estructura del Proyecto**

```plaintext
/src/
├── api/
│   ├── assignRolesByLeaderboard.js  # Endpoint para asignar roles según el medallero
├── events/
│   ├── ready.js                     # Evento: Bot listo
│   ├── interactionCreate.js         # Evento: Manejo de interacciones
│   ├── messageCreate.js             # Evento: Manejo de mensajes
├── modules/
│   ├── roleManagement.js            # Lógica de gestión de roles
├── utils/
│   ├── logger.js                    # Utilidad para logs
│   ├── discordAPI.js                # Funciones auxiliares para Discord
├── config.js                        # Configuración general
└── index.js                         # Punto de entrada principal
```

---

## **Contribuir**

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Haz un push a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

---

## **Licencia**

Este proyecto está licenciado bajo la [MIT License](LICENSE).
