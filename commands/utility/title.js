const { SlashCommandBuilder } = require('discord.js');

const titleMap = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('title')
        .setDescription('Set up the title for the issue.')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('The input to set as title')
                .setRequired(true)),
    execute(interaction) {
        const title = interaction.options.getString('input');
        console.log(interaction.user.id, title);
        titleMap.set(interaction.user.id, title);
        console.log(titleMap.get(interaction.user.id));
    },
};
