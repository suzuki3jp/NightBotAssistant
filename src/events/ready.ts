import { Base } from '../Base';
import { SlashCommands } from '../class/SlashCommands';

export const ready = async (base: Base) => {
    const { guildWhiteLists } = base.DM.getConfig();

    guildWhiteLists.forEach(async (guildId) => {
        await base.discord.application?.commands.set(SlashCommands, guildId);
    });
    base.logger.system('discord client is ready.');
};
