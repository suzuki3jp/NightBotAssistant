import { Base } from '../Base';
import { DiscordSlashCommand } from '../class/DiscordSlashCommand';
import { commandInteraction } from './commandInteraction';
import { ready } from './ready';

export const subscribeEvents = (base: Base) => {
    // discord events
    base.discord.on('ready', async () => ready(base));

    base.discord.on('interaction', async (interaction) => {
        if (interaction.isCommand()) {
            commandInteraction(new DiscordSlashCommand(base, interaction));
        }
    });

    // logger events
    base.logger.on('system', (message) => {
        if (process.argv.includes('--debug')) {
            console.log(message);
        }
    });

    base.logger.on('system', (message) => console.log(message));

    base.logger.on('info', (message) => console.log(message));

    // client login
    base.discord.login(base.discordToken);
};
