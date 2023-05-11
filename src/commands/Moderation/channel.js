const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('channel')
    .setDescription('Create or delete a channel.')
    .addSubcommand(command => command.setName('create').setDescription('Create a channel with specified name.')
        .addStringOption(option => option.setName('name').setDescription(`Specified name will be your channel's name.`).setRequired(true).setMinLength(1).setMaxLength(100))
        .addChannelOption(option => option.setName('category').setDescription(`Specified category will be your channel's category parent.`).setRequired(false).addChannelTypes(ChannelType.GuildCategory).setRequired(true))
        .addStringOption(option => option.setName('type').setDescription('Specified type will be your channel type.').addChoices(
            { name: `Text Channel`, value: `text` },
            { name: `Voice Channel`, value: `voice`},
            { name: `Stage Channel`, value: `stage` }, 
            { name: `Announcement Channel`, value: `announcement` },
            { name: `Forum Channel`, value: `forum` }
        ).setRequired(true)))
    .addSubcommand(command => command.setName('delete').setDescription('Deletes specified channel.').addChannelOption(option => option.setName('channel').setDescription('Specified channel will be deleted.').setRequired(true).addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildCategory, ChannelType.GuildStageVoice, ChannelType.GuildVoice, ChannelType.GuildText, ChannelType.GuildForum)))
    .addSubcommand(command => command.setName('edit').setDescription('Deletes specified channel.').addChannelOption(option => option.setName('channel').setDescription('Specified channel will be edited.').setRequired(true).addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildStageVoice, ChannelType.GuildVoice, ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildCategory)).addStringOption(option => option.setName('new-name').setDescription(`Specified name will be your channel's new name.`).setMinLength(1).setMaxLength(100).setRequired(true))),
 
    async execute(interaction, err) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
        const sub = interaction.options.getSubcommand();
 
        switch (sub) {
            case 'create':
 
            const name = await interaction.options.getString('name');
            const category = await interaction.options.getChannel('category');
            const type = await interaction.options.getString('type');
 
            if (type === 'text') {
 
                const channel = await interaction.guild.channels.create({
                    name: name,
                    type: ChannelType.GuildText,
                    parent: category.id
 
                }).catch(err => {
                    interaction.reply({ content: `**Couldn't** create your "**${name}**" channel, please make **sure** I have the **Manage Channels** permission!`})
                });
 
                const channelembed = new EmbedBuilder()
                .setColor('DarkRed')
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
                .setAuthor({ name: `📃 Channel Tool`})
                .setFooter({ text: `📃 Channel Created`})
                .setTitle('> Channel Created')
                .addFields({ name: `• Channel Created`, value: `> Your channel (${channel}) has been created in \n> the category ${category}!`})
 
                await interaction.reply({ embeds: [channelembed]})
            }
 
            if (type === 'voice') {
 
                const channel = await interaction.guild.channels.create({
                    name: name,
                    type: ChannelType.GuildVoice,
                    parent: category.id
 
                }).catch(err => {
                    interaction.reply({ content: `**Couldn't** create your "**${name}**" channel, please make **sure** I have the **Manage Channels** permission!`})
                });
 
                const channelembed = new EmbedBuilder()
                .setColor('DarkRed')
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
                .setAuthor({ name: `📃 Channel Tool`})
                .setFooter({ text: `📃 Channel Created`})
                .setTitle('> Channel Created')
                .addFields({ name: `• Channel Created`, value: `> Your channel (${channel}) has been created in \n> the category ${category}!`})
 
                await interaction.reply({ embeds: [channelembed]})
            }
 
            if (type === 'stage') {
 
                const channel = await interaction.guild.channels.create({
                    name: name,
                    type: ChannelType.GuildStageVoice,
                    parent: category.id
 
                }).catch(err => {
                    interaction.reply({ content: `**Couldn't** create your "**${name}**" channel, please make **sure** I have the **Manage Channels** permission!`})
                });
 
                const channelembed = new EmbedBuilder()
                .setColor('DarkRed')
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
                .setAuthor({ name: `📃 Channel Tool`})
                .setFooter({ text: `📃 Channel Created`})
                .setTitle('> Channel Created')
                .addFields({ name: `• Channel Created`, value: `> Your channel (${channel}) has been created in \n> the category ${category}!`})
 
                await interaction.reply({ embeds: [channelembed]})
            }
 
            if (type === 'announcement') {
 
                const channel = await interaction.guild.channels.create({
                    name: name,
                    type: ChannelType.GuildAnnouncement,
                    parent: category.id
 
                }).catch(err => {
                    interaction.reply({ content: `**Couldn't** create your "**${name}**" channel, please make **sure** I have the **Manage Channels** permission!`})
                });
 
                const channelembed = new EmbedBuilder()
                .setColor('DarkRed')
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
                .setAuthor({ name: `📃 Channel Tool`})
                .setFooter({ text: `📃 Channel Created`})
                .setTitle('> Channel Created')
                .addFields({ name: `• Channel Created`, value: `> Your channel (${channel}) has been created in \n> the category ${category}!`})
 
                await interaction.reply({ embeds: [channelembed]})
            }
 
            if (type === 'forum') {
 
                const channel = await interaction.guild.channels.create({
                    name: name,
                    type: ChannelType.GuildForum,
                    parent: category.id
 
                }).catch(err => {
                    interaction.reply({ content: `**Couldn't** create your "**${name}**" channel, please make **sure** I have the **Manage Channels** permission!`})
                });
 
                const channelembed = new EmbedBuilder()
                .setColor('DarkRed')
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
                .setAuthor({ name: `📃 Channel Tool`})
                .setFooter({ text: `📃 Channel Created`})
                .setTitle('> Channel Created')
                .addFields({ name: `• Channel Created`, value: `> Your channel (${channel}) has been created in \n> the category ${category}`})
 
                await interaction.reply({ embeds: [channelembed]})
            }
 
            break;
            case 'delete':
 
            const channel = await interaction.options.getChannel('channel');
            const channeldelete = await interaction.guild.channels.cache.get(channel.id);
 
            const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setTitle('> Channel Deleted')
            .setAuthor({ name: `📃 Channel Tool`})
            .setFooter({ text: `📃 Channel Deleted`})
            .addFields({ name: `• Channel Deleted`, value: `> Your channel (${channeldelete}) was deleted!`})
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
 
            await channeldelete.delete().catch(err => {
                return interaction.reply({ content: `**Couldn't** delete that channel! Check my **permissions** and try again.`})
            });
 
            await interaction.reply({ embeds: [embed] });
 
            break;
            case 'edit':
 
            const newname = await interaction.options.getString('new-name');
            const newchannel = await interaction.options.getChannel('channel');
            const updatedchannel = await interaction.guild.channels.cache.get(newchannel.id);
            const oldname = updatedchannel.name;
 
            const editembed = new EmbedBuilder()
            .setColor('DarkRed')
            .setAuthor({ name: `📃 Channel Tool`})
            .setFooter({ text: `📃 Channel Edited`})
            .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
            .setTimestamp()
            .addFields({ name: `• Channel Edited`, value: `> Channel (${updatedchannel}) name changed \n> from "**${oldname}**" => "**${newname}**".`})
 
            updatedchannel.setName(newname).catch(err => {
                interaction.reply({ content: `**Couldn't** edit ${updatedchannel}'s name. Check my **permissions** and try again.`});
            })
 
            await interaction.reply({ embeds: [editembed] });
        }
    }
}