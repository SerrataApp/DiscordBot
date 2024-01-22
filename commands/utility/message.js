const { SlashCommandBuilder } = require('discord.js');

const messageMap = new Map();

const getMessage = (id) => {
    return messageMap.get(id);
}

const removeMessage = (id) => {
    messageMap.delete(id);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Set up the message for the issue.')
        .addStringOption(option => 
            option.setName('message')
            .setDescription('The message for the issue')
            .setRequired(true)),
    execute(interaction) {
        const message = interaction.options.getString('message');
        messageMap.set(interaction.user.id, message);
        console.log(messageMap.get(interaction.user.id));
        interaction.reply(`message set to: ${message}`);
    },
    getMessage,
    removeMessage
};