const { SlashCommandBuilder } = require('discord.js');

const titleMap = new Map();

const getTitle = (id) => {
    return titleMap.get(id);
}

const removeTitle = (id) => {
    titleMap.delete(id);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('title')
        .setDescription('Set up the title for the issue.')
        .addStringOption(option => 
            option.setName('title')
            .setDescription('The title for the issue')
            .setRequired(true)),
    execute(interaction) {
        const title = interaction.options.getString('title');
        titleMap.set(interaction.user.id, title);
        console.log(titleMap.get(interaction.user.id));
        interaction.reply(`Title set to: ${title}`);
    },
    getTitle,
    removeTitle
};