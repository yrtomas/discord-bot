module.exports = (app, bot) => {
    app.post('/updateLeaderboard', async (req, res) => {
        const { guildId, leaderboard } = req.body;

        if (!guildId || !leaderboard || !Array.isArray(leaderboard)) {
            return res.status(400).send('Datos inválidos: Se requiere guildId y leaderboard.');
        }

        try {
            const guild = await bot.guilds.fetch(guildId);

            // Iterar por cada posición en el leaderboard
            for (let i = 0; i < leaderboard.length; i++) {
                const userId = leaderboard[i].userId;
                const position = i + 1; // Posición en el leaderboard

                const member = await guild.members.fetch(userId);
                let role;

                // Asignar roles según la posición
                if (position === 1) {
                    role = guild.roles.cache.find(r => r.name === '🥇 Líder');
                } else if (position === 2) {
                    role = guild.roles.cache.find(r => r.name === '🥈 Subcampeón');
                } else if (position === 3) {
                    role = guild.roles.cache.find(r => r.name === '🥉 Tercer Lugar');
                } else if (position <= 10) {
                    role = guild.roles.cache.find(r => r.name === '⭐ Finalista');
                } else {
                    role = guild.roles.cache.find(r => r.name === '💪 Participante Destacado');
                }

                if (role) {
                    // Elimina roles previos relacionados con el medallero antes de asignar el nuevo
                    const leaderboardRoles = ['🥇 Líder', '🥈 Subcampeón', '🥉 Tercer Lugar', '⭐ Finalista', '💪 Participante Destacado'];
                    for (const r of leaderboardRoles) {
                        const existingRole = guild.roles.cache.find(role => role.name === r);
                        if (existingRole && member.roles.cache.has(existingRole.id)) {
                            await member.roles.remove(existingRole);
                        }
                    }

                    // Asignar el nuevo rol
                    await member.roles.add(role);
                    console.log(`Rol ${role.name} asignado a ${member.user.tag}`);
                }
            }

            res.status(200).send('Roles actualizados según el medallero.');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error actualizando el medallero.');
        }
    });
};
