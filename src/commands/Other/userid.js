const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')


module.exports = {
    
    data: new SlashCommandBuilder()
      .setName("fetch-userid")
      .setDescription("fetch user id")
      .addUserOption(option => option
        .setName("user")
        .setDescription("The user you want to id")
        .setRequired(true)
    ),
      
    async execute(interaction, client) {
        const target = await interaction.options.getUser(`user`)
        //let user = await client.users.fetch(interaction.targetId)
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`${target.username}'s user ID: \`${target.id}\``)
        
        interaction.reply({ embeds: [embed], ephemeral: false })
    },
}