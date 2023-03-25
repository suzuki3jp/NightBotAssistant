import { Base } from '../Base';

export const subscribeEvents = (base: Base) => {
    base.discord.on('ready', () => {
        console.log('discord client is ready!');
    });

    base.discord.login(base.discordToken);
};
