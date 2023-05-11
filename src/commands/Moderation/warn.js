const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed, PermissionsBitField } = require('discord.js');
const { Schema } = require('mongoose');
const warnSchema = require('../../schems/warnSchema');


module.exports ={
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user.')
    .addSubcommand(command => command
        .setName('user')
        .setDescription('Warn a user.')
        .addUserOption(option => option
            .setName('warn-user')
            .setDescription('The user who you want to warn.')
            .setRequired(true))
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Reason for the warn.')))
    .addSubcommand(command => command
        .setName('show')
        .setDescription('View a user\'s warnings.')
        .addUserOption(option => option
            .setName('warns-user')
            .setDescription('The user who\'s warns you want to see.')))
    .addSubcommand(command => command
        .setName('remove')
        .setDescription('Remove a user\'s warning.')
        .addUserOption(option => option
            .setName('remove-warn-user')
            .setDescription('The user who\'s warn you want to remove.')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('removed-warn')
            .setDescription('The warning you want to get rid of from the selected user.')
            .setRequired(true))),
    async execute (interaction)
    {
 
        const command = interaction.options.getSubcommand()
 
        if (command === 'user')
        {
 
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: 'You need the Moderate Members permission to use this command.', ephemeral: true })
 
            const warnedUser = interaction.options.getUser('warn-user');
            const reason = interaction.options.getString('reason') || 'No reason given';
 
            if (warnedUser.bot) return await interaction.reply({ content: 'You cannot warn a bot.', ephemeral: true })
 
            let Data = await warnSchema.findOne({ UserID: interaction.options.getUser('warn-user').id, GuildID: interaction.guild.id })
 
            const unwarnedEmbed = new EmbedBuilder()
            .setTitle('Warn Command')
            .addFields({ name: 'Warned!', value: `> You did not warn **${warnedUser}** with the reason of **${reason}**.\n> \n> You have cancelled the warning.` })
            .setColor('#32CD32')
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTimestamp()
 
            const warnedEmbed = new EmbedBuilder()
            .setTitle('Warn Command')
            .addFields({ name: 'Warned!', value: `> You have warned **${warnedUser}** with the reason of **${reason}**.` })
            .setColor('Red')
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTimestamp()
 
            const warningEmbed = new EmbedBuilder()
            .setTitle('Warn Command')
            .addFields({ name: 'Warn!', value: `> You will warn **${warnedUser}** with the reason of **${reason}**.\n> \n> Do you confirm?` })
            .setColor('Blue')
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTimestamp()
 
            const confirmButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('confirm')
                    .setLabel('Confirm')
                    .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                    .setCustomId('decline')
                    .setLabel('Decline')
                    .setStyle(ButtonStyle.Danger),
                )
            var message = await interaction.reply({ embeds: [warningEmbed], components: [confirmButton] })
 
            const collector = message.createMessageComponentCollector()
 
            collector.on('collect', async i => {
 
                if (i.user.id != interaction.user.id) return await i.reply({ content: 'This isn\'t your command!', ephemeral: true })
 
                if (i.customId == 'confirm')
                {
 
                    if (!Data)
                    {
                        Data = new warnSchema({
                            UserID: warnedUser.id,
                            GuildID: interaction.guild.id,
                        })
 
                    }
 
                    await i.reply({ content: 'Confirmed!', ephemeral: true })
                    await interaction.editReply({ embeds: [warnedEmbed], components: [] })
                    Data.Warns.push(reason)
 
                    const dmEmbed = new EmbedBuilder()
                    .setTitle('Warned!')
                    .addFields({ name: 'You have been warned!', value: `You have been warned in ${interaction.guild.name} for the reason of ${reason}` })
                    .setColor('Red')
                    .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                    await warnedUser.send({ embeds: [dmEmbed] }).catch(err => {
                        return;
                    })
 
                    await Data.save()
 
                }
                else {
 
                    await i.reply({ content: 'Declined!', ephemeral: true })
                    await interaction.editReply({ embeds: [unwarnedEmbed], components: [] })
 
                }
 
            })
 
        }
 
 
        if (command === 'show')
        {
 
            const warnsUser = interaction.options.getUser('warns-user') || interaction.user;
 
            let DataWarns = await warnSchema.findOne({ UserID: warnsUser.id, GuildID: interaction.guild.id })
 
            if ((!DataWarns || DataWarns.Warns.length == 0) && command === 'show')
            {
 
                const noWarnsEmbed = new EmbedBuilder()
                .setTitle('No warnings!')
                .addFields({ name: '0 warnings!', value: `${warnsUser} has no warnings!` })
                .setColor('Blue')
                .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                return await interaction.reply({ embeds: [noWarnsEmbed] })
 
            }
 
            else {
 
                let numberOfWarns1 = 0
                let numberOfWarns = 1
                let warns = ''
 
                for (i in DataWarns.Warns)
                {
 
                    warns += `**Warning** **__${numberOfWarns}__**\n${DataWarns.Warns[numberOfWarns1]}\n\n`
 
                    numberOfWarns += 1
                    numberOfWarns1 += 1
 
                }
 
                const showWarnsEmbed = new EmbedBuilder()
                .setAuthor({ name: `${warnsUser.username}'s | warnings in ${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .setTitle('Warn command')
                .setDescription(warns)
                .setColor('Blue')
                .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()
 
                await interaction.reply({ embeds: [showWarnsEmbed] })
 
            }
        }
 
        if (command === 'remove')
        {
 
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: 'You need the Moderate Members permission to use this command.', ephemeral: true })
 
            removeWarnUser = interaction.options.getUser('remove-warn-user');
            warnRemoved = interaction.options.getInteger('removed-warn')
            warnRemoved -= 1
 
            let DataUnwarned = await warnSchema.findOne({ UserID: interaction.options.getUser('remove-warn-user').id, GuildID: interaction.guild.id })
 
            if (!DataUnwarned || DataUnwarned.Warns.length == 0)
            {
                const noWarnsEmbed = new EmbedBuilder()
                .setTitle('No warnings!')
                .addFields({ name: '0 warnings!', value: `${removeWarnUser} has no warnings to remove!` })
                .setColor('Blue')
                .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                return await interaction.reply({ embeds: [noWarnsEmbed] })
            }
 
            if (DataUnwarned.Warns[warnRemoved] == undefined)
            {
                const highWarnEmbed = new EmbedBuilder()
                .setTitle('No warnings found!')
                .addFields({ name: 'No warning found!', value: `You didn't specify a warn that is within the range of ${removeWarnUser}'s warns.\nUse \`/warn show\` to see their warns.` })
                .setColor('Blue')
                .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                return await interaction.reply({ embeds: [highWarnEmbed] })
            }
 
 
            const removedWarnEmbed = new EmbedBuilder()
            .setTitle('Warn command')
            .addFields({ name: 'Warning removed!', value: `You have removed ${removeWarnUser}'s warn that was : **${DataUnwarned.Warns[warnRemoved]}**` })
            .setColor('Blue')
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            const dmEmbed = new EmbedBuilder()
            .setTitle('Unwarned!')
            .addFields({ name: 'You have been unwarned!', value: `You have been unwarned in ${interaction.guild.name}!\nThe warn removed was : ${DataUnwarned.Warns[warnRemoved]}` })
            .setColor('Red')
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            await removeWarnUser.send({ embeds: [dmEmbed] }).catch(err => {
                return;
            })
            DataUnwarned.Warns.splice(DataUnwarned.Warns[warnRemoved], 1)
            DataUnwarned.save()
            return await interaction.reply({ embeds: [removedWarnEmbed] })
        }
 
    }
}