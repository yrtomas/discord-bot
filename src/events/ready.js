module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        console.log(`Bot está listo: ${bot.user.tag}`);
    },
};
