const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const dotenv = require('dotenv');

const { SlashCommandBuilder } = require('discord.js');
const { getMessage, removeMessage} = require('./message');
const { getTitle, removeTitle} = require('./title');
dotenv.config();

const MyOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new MyOctokit({ auth: process.env.PERSONNAL_TOKEN });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Send the issue.'),
    execute(interaction) {

        console.log(getMessage(interaction.user.id), getTitle(interaction.user.id));
        if (!getMessage(interaction.user.id) || !getTitle(interaction.user.id)) {
            interaction.reply(`You need to set up a title and a message first.`);
            return;
        }
        octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: 'SerrataApp',
            repo: 'serrata',
            title: `${getTitle(interaction.user.id)}`,
            body: `${getMessage(interaction.user.id)}`,
            assignees: [
              'CorentinAT'
            ],
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        removeTitle(interaction.user.id);
        removeMessage(interaction.user.id);
        interaction.reply(`Issue sent to GitHub`);
    },
};