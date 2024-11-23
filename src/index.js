const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const fs = require('fs');
const path = require('path');

// Inicializar bot y servidor
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const app = express();

app.use(bodyParser.json());

// Endpoint de prueba
app.get('/', (req, res) => {
    res.send('Bot está corriendo');
});

// Cargar eventos
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot));
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot));
    }
}

// Registrar endpoints de la API
const apiPath = path.join(__dirname, 'api');
const apiFiles = fs.readdirSync(apiPath).filter(file => file.endsWith('.js'));

for (const file of apiFiles) {
    const endpoint = require(`./api/${file}`);
    endpoint(app, bot); // Cada archivo exporta una función para registrar un endpoint
}


// Bot listo
bot.once('ready', () => {
    console.log(`Bot conectado como ${bot.user.tag}`);
});

// Iniciar bot y servidor
bot.login(config.token);
app.listen(config.port, () => console.log(`Servidor corriendo en http://localhost:${config.port}`));
