const ticketSchema = require('../../schems/ticketSchema');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-disable')
        .setDescription('Disables the ticket system for the server.'),
 
    async execute(interaction, client) {
        try {
            const GuildID = interaction.guild.id;
 
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
            }
 
            const embed2 = new EmbedBuilder()
            .setColor('DarkRed')
            .setDescription(`> The ticket system has been disabled already!`)
            .setTimestamp()
            .setAuthor({ name: `🎫 Ticket System`})
            .setFooter({ text: `🎫 Ticket System Disabled`})
            .setThumbnail("https://cdn.discordapp.com/avatars/1082544311431860254/10e13c74c439f3c7bfc156e9b49f83f7.png")
            const data = await ticketSchema.findOne({ GuildID: GuildID });
            if (!data)
            return await interaction.reply({ embeds: [embed2], ephemeral: true });
 
            await ticketSchema.findOneAndDelete({ GuildID: GuildID });
 
            const channel = client.channels.cache.get(data.Channel);
            if (channel) {
                await channel.messages.fetch({ limit: 1 }).then(messages => {
                    const lastMessage = messages.first();
                    if (lastMessage.author.id === client.user.id) {
                        lastMessage.delete();
                    }
                });
            }
 
            const embed = new EmbedBuilder()
            .setColor('DarkRed')
            .setDescription(`> The ticket system has been disabled!`)
            .setTimestamp()
            .setAuthor({ name: `🎫 Ticket System`})
            .setFooter({ text: `🎫 Ticket System Disabled`})
            .setThumbnail("https://cdn.discordapp.com/avatars/1082544311431860254/10e13c74c439f3c7bfc156e9b49f83f7.png")
 
            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
        }
    }
};