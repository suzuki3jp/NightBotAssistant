import type { Client as Discord } from 'discord.js';
import type { Client as NightBot } from 'nightbot.js';

import { generateClients, typeGuardDiscordToken } from './utils/index';

export class Base {
    public discord: Discord;
    public nightbot: NightBot;
    public discordToken: string;

    constructor() {
        const { discord, nightbot } = generateClients();
        if (!typeGuardDiscordToken(process.env.DISCORD_TOKEN)) throw new Error('Invalid .env');
        this.discord = discord;
        this.nightbot = nightbot;
        this.discordToken = process.env.DISCORD_TOKEN;
    }
}
