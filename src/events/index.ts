import { Base } from '../Base';
import { SlashCommands } from '../class/SlashCommands';

export const subscribeEvents = (base: Base) => {
    const { guildWhiteLists } = base.DM.getConfig();

    base.discord.on('ready', async () => {
        guildWhiteLists.forEach(async (guildId) => {
            await base.discord.application?.commands.set(SlashCommands, guildId);
        });
        console.log('discord client is ready!');
    });

    base.discord.login(base.discordToken);
};
