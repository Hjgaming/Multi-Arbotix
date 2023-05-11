const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const revSchema = require('../../schems/reviewSchema');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('review-disable')
    .setDescription('Disable the review system'),
    async execute(interaction) {
 
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You do not have permissions to use this command', ephemreal: true});
 
        const {guildId} = interaction;
 
        const embed = new EmbedBuilder()
 
        revSchema.deleteMany({ Guild: guildId}, async (err, data) => {
            embed.setColor('#A256FF')
            .setDescription('Your review system was successfully disabled')
            .setFooter({ text: `${interaction.guild.name}`})
            .setTimestamp()
 
            return interaction.reply({ embeds: [embed] })
        })
    }
}