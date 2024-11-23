module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (!interaction.isCommand()) return;
        console.log(`Comando recibido: ${interaction.commandName}`);
    },
};
