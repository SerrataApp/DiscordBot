const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const dotenv = require('dotenv');

const { SlashCommandBuilder } = require('discord.js');
dotenv.config();

const MyOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new MyOctokit({ auth: process.env.PERSONNAL_TOKEN });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Delete the issue.')
        .addStringOption(option => 
            option.setName('number')
            .setDescription('The number of the issue')
            .setRequired(true)),
    execute(interaction) {
        octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: 'SerrataApp',
            repo: 'serrata',
            issue_number: interaction.options.getString('number'),
            state: 'closed',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
        interaction.reply(`Issue deleted to GitHub`);
    },
};