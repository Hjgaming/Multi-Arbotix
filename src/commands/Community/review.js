const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const revSchema = require('../../schems/reviewSchema');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("review")
    .setDescription(`Server Review`)
    .addStringOption(option =>option.setName("stars").setDescription("Amount of stars.").addChoices(
                { name: "⭐", value: "⭐" },
                { name: "⭐⭐", value: "⭐⭐" },
                { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }
            )
            .setRequired(true))
    .addStringOption(option => option.setName("description").setDescription("Description of your review.").setRequired(true)),
    async execute (interaction) {
 
        const data = await revSchema.findOne({ Guild: interaction.guild.id });

       
 
            if (!data) {
 
                const embed0 = new EmbedBuilder()
                .setColor('#A256FF')
                .setDescription('The review system has not been created yet')
                .setFooter({ text: `${interaction.guild.name}`})
                .setTimestamp()
 
                return await interaction.reply({ embeds: [embed0], ephemeral: true})
            }
 
            if (data) {
                const channelID = data.Channel;
                const stars = interaction.options.getString("stars");
                const description = interaction.options.getString("description");
                const channel = interaction.guild.channels.cache.get(channelID);
                const member = interaction.user.tag
 
                const embed1 = new EmbedBuilder()
                .setColor('#A256FF')
                .setDescription(`Review from ${member}`)
                .addFields(
                    { name: "Stars", value: `${stars}`, inline: true },
                    { name: "Review", value: `${description}\n` },
                    )
                .setFooter({ text: `${interaction.guild.name}`})
                .setTimestamp()
 
                const embed2 = new EmbedBuilder()
                .setColor('#A256FF')
                .setDescription(`Your review was succesfully sent in ${channel}`)
                .setFooter({ text: `${interaction.guild.name}`})
                .setTimestamp()
 
                channel.send({ embeds: [embed1] });
                
                return interaction.reply({ embeds: [embed2], ephemeral: true });
            }
        }
 
    }
