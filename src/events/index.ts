import { Base } from '../Base';
import { ready } from './ready';

export const subscribeEvents = (base: Base) => {
    base.discord.on('ready', async () => ready(base));

    base.discord.login(base.discordToken);
};
