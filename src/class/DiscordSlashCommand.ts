import { CommandInteraction } from 'discord.js';

import { Base } from '../Base';

export class DiscordSlashCommand extends Base {
    public _interaction: CommandInteraction;
    public command: string;
    public subCommand: string | null;

    constructor(base: Base, interaction: CommandInteraction) {
        super(base);
        this._interaction = interaction;
        this.command = this._interaction.commandName;
        this.subCommand = this._interaction.options.getSubcommand();
    }
}
