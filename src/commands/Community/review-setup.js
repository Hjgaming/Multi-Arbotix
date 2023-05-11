const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const revSchema = require('../../schems/reviewSchema');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("review-setup")
    .setDescription("setup the review system")
    .addChannelOption(option => option.setName("channel").setDescription("the channel for the reviews").addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute (interaction, client) {
 
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You do not have permissions to use this command', ephemreal: true});
 
        const { channel, guildId, options } = interaction;
        const revChannel = options.getChannel("channel");

        
    
 
        const data = await revSchema.findOne({ Guild: interaction.guild.id });

        if(!data) {
            revSchema.create({
                Guild: guildId,
                Channel: revChannel.id
            });
 
                const embed1 = new EmbedBuilder()
                .setColor('#A256FF')
                .setDescription(`Your Review System has been successfully setup in ${revChannel}`)
                .setFooter({ text: `${interaction.guild.name}`})
                .setTimestamp()
 
                return interaction.reply({ embeds: [embed1] })
            } else {
            if (data) {
                const c = client.channels.cache.get(data.Channel);
 
                const embed2 = new EmbedBuilder()
                .setColor('#A256FF')
                .setDescription(`You have already setup the review system in ${c}`)
                .setFooter({ text: `${interaction.guild.name}`})
                .setTimestamp()
 
                return interaction.reply({ embeds: [embed2], ephemreal: true})
            }
            }
        }
    }