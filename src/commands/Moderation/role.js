const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDMPermission(false)
        .setDescription('Removes specified role from specified user.')
        .addSubcommand(command => command.setName('add').setDescription('Gives a role to specified user.').addUserOption(option => option.setName('user').setDescription('Specified user will be given specified role.').setRequired(true)).addRoleOption(option => option.setName('role').setDescription('Specified role will be given to specified user.').setRequired(true)))
        .addSubcommand(command => command.setName('remove').setDescription('Removes a user from specified role.').addUserOption(option => option.setName('user').setDescription('Specified user will be removed from specified role.').setRequired(true)).addRoleOption(option => option.setName('role').setDescription('Specified role will be removed from specified user.').setRequired(true)))
        .addSubcommand(command => command.setName('members').setDescription('Displays the amount of people who have specified role..').addRoleOption(option => option.setName("role").setDescription(`Specified role's member count will be displayed.`).setRequired(true)))
        .addSubcommand(command => command.setName('delete').setDescription('Deletes specified role.').addRoleOption(option => option.setName('role').setDescription('Specified role will be deleted from the server.').setRequired(true)))
 
        .addSubcommand(command => command.setName('create').setDescription('Creates a role with specified details.')
            .addStringOption(option => option.setName('name').setDescription(`Specified name will be your role's name.`).setRequired(true).setMinLength(1).setMaxLength(50))
            .addStringOption(option => option.setName('color').setDescription(`Specified color will be your role's color.`).addChoices(
                {name: "• No Color", value: "#000000"},
                {name: "• Aqua", value: "#00FFFF"},
                {name: "• Blurple", value: "#7289DA"},
                {name: "• Fuchsia", value: "#FF00FF"},
                {name: "• Gold", value: "#FFD700"},
                {name: "• Green", value: "#008000"},
                {name: "• Grey", value: "#808080"},
                {name: "• Greyple", value: "#7D7F9A"},
                {name: "• Light-grey", value: "#D3D3D3"},
                {name: "• Luminos-vivid-pink", value: "#FF007F"},
                {name: "• Navy", value: "#000080"},
                {name: "• Not-quite-black", value: "#232323"},
                {name: "• Orange", value: "#FFA500"},
                {name: "• Purple", value: "#800080"},
                {name: "• Red", value: "#FF0000"},
                {name: "• White", value: "#FFFFFF"},
                {name: "• Yellow", value: "#FFFF00"},
                {name: "• Blue", value: "#0000FF"},
            ).setRequired(true))
            .addStringOption(option => option.setName('display-separately').setDescription(`Toggle if you want your role to show on the sidebar separately.`).addChoices(
                {name: "• True", value: "True"},
                {name: "• False", value: "False"},
            ).setRequired(true))
            .addStringOption(option => option.setName('permissions').setDescription('Specifify your permissions. For example: viewchannels, manageroles.'))
        ),
 
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
 
        const username = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        const sub = interaction.options.getSubcommand();
 
        switch (sub) {
 
            case 'add':
 
            const addembed =new EmbedBuilder()
            .setColor('DarkRed')
            .setAuthor({ name: `💳 Role Tool`})
            .setFooter({ text: `💳 Role Added`})
            .setTimestamp()
            .setTitle(`> Role Added to ${username.username}`)
            .addFields({ name: `• User`, value: `> ${username}`, inline: true})
            .addFields({ name: `• Role`, value: `> ${role}`, inline: true})
            .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
 
            await member.roles.add(role).catch(err => {
                addembed.setTitle('> Error!');
                addembed.setFooter({ text: `💳 Role not Added`});
                addembed.setFields({ name: `• Error Occured`, value: `> Error received trying to add a role \n> to ${username}. **Check** my role position \n> and **permissions** and try again!`});
                return;
            })
 
            await interaction.reply({ embeds: [addembed] });
 
            break;
            case 'remove':
 
            const removeembed = new EmbedBuilder()
            .setColor('DarkRed')
            .setAuthor({ name: `💳 Role Tool`})
            .setFooter({ text: `💳 Role Removed`})
            .setTimestamp()
            .setTitle(`> Role Removed from ${username.username}`)
            .addFields({ name: `• User`, value: `> ${username}`, inline: true})
            .addFields({ name: `• Role`, value: `> ${role}`, inline: true})
            .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
 
            await member.roles.remove(role).catch(err => {
                removeembed.setTitle('> Error!');
                removeembed.setFooter({ text: `💳 Role not Removed`});
                removeembed.setFields({ name: `• Error Occured`, value: `> Error received trying to remove a role \n> from ${username}. **Check** my role position \n> and **permissions** and try again!`});
                return;
            })
 
            await interaction.reply({ embeds: [removeembed] });
 
            break;
            case 'members':
 
            const memberslist = await interaction.guild.roles.cache.get(role.id).members.map(m => m.user.tag).join('\n> ');
 
            const embed = new EmbedBuilder()
            .setColor('DarkRed')
            .setTimestamp()
            .setAuthor({ name: `📃 Role Members tool`})
            .setTimestamp()
            .setTitle(`> Role's Members`)
            .addFields({ name: `• Role ID`, value: `> **${role.id}**`})
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
            .setFooter({text: `📃 Role Members fetched`})
 
            if (!memberslist) {
                embed.addFields({ name: `• Role Members List`, value: `> No users found with specified role!`});
            } else {
                embed.addFields({ name: `• Role Members List`, value: `> ${memberslist.slice(0, 900)}`});
            }
 
            await interaction.reply({ embeds: [embed] });
 
            break;
            case 'delete':
 
            const deleterole = await interaction.options.getRole('role');
            const guildrole = await interaction.guild.roles.cache.get(deleterole.id);
 
            if (!guildrole) return await interaction.reply({ content: `You **must** select a **valid** role, **cannot** delete **nothing**..`, ephemeral: true});
            else {
 
                const deleteembed = new EmbedBuilder()
                .setColor('DarkRed')
                .setAuthor({ name: `💳 Role Tool`})
                .setFooter({ text: `💳 Role Deleted`})
                .setTimestamp()
                .setTitle(`> Role Deleted Successfully`)
                .addFields({ name: `• Role ID`, value: `> ${guildrole.id}`, inline: true})
                .addFields({ name: `• Executer`, value: `> ${interaction.user}`, inline: true})
                .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
 
                try {
                    await guildrole.delete();
                } catch (err) {
                    return await interaction.reply({ content: `**Couldn't** delete ${guildrole}! Check my **permissions** and role **position** and try again.`});
                }
 
                await interaction.reply({ embeds: [deleteembed] });
 
            }
 
            break;
            case 'create':
 
            const name = interaction.options.getString('name');
            const color = interaction.options.getString('color');
            const permstring = interaction.options.getString('permissions') || 'noperms';
            const permissions = permstring.toLowerCase();
            const side = interaction.options.getString('display-separately').toLowerCase();
            const displayside = interaction.options.getString('display-separately');
 
            const newrole = await interaction.guild.roles.create({
                name: name,
                color: color,
                hoist: side,
                reason: 'PixelVal created a role!'
            }).catch(err => {
                return interaction.reply({ content: `**Couldn't** create your role! **Check** my permissions and **role position** and try again.`, ephemeral: true});
            })
 
            await interaction.deferReply();
 
            let permissionsarray = [ ];
 
            if (permissions.includes('viewchannel')) {
                newrole.setPermissions([PermissionsBitField.Flags.ViewChannel]);
 
                permissionsarray.push('View Channels')
            }
 
            if (permissions.includes('managechannel')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageChannels]);
 
                permissionsarray.push('Manage Channels')
            }
 
            if (permissions.includes('managerole')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageRoles]);
 
                permissionsarray.push('Manage Roles')
            }
 
            if (permissions.includes('manageexpression')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageEmojisAndStickers]);
 
                permissionsarray.push('Manage Expresssions')
            }
 
            if (permissions.includes('viewauditlog') || permissions.includes('viewlog') || permissions.includes('viewaudit')) {
                newrole.setPermissions([PermissionsBitField.Flags.ViewAuditLog]);
 
                permissionsarray.push('View Audit Log')
            }
 
            if (permissions.includes('viewserverinsight')) {
                newrole.setPermissions([PermissionsBitField.Flags.ViewGuildInsights]);
 
                permissionsarray.push('View Server Insights')
            }
 
            if (permissions.includes('managewebhook')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageWebhooks]);
 
                permissionsarray.push('Manage Webhooks')
            }
 
            if (permissions.includes('manageserver')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageGuild]);
 
                permissionsarray.push('Manage Server')
            }
 
            if (permissions.includes('createinvite') || permissions.includes('invite')) {
                newrole.setPermissions([PermissionsBitField.Flags.CreateInstantInvite]);
 
                permissionsarray.push('Create Invite')
            }
 
            if (permissions.includes('changenickname') || permissions.includes('nickname')) {
                newrole.setPermissions([PermissionsBitField.Flags.ChangeNickname]);
 
                permissionsarray.push('Change Nickname')
            }
 
            if (permissions.includes('managenickname')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageNicknames]);
 
                permissionsarray.push('Manage Nicknames')
            }
 
            if (permissions.includes('kick') || permissions.includes('kickmember')) {
                newrole.setPermissions([PermissionsBitField.Flags.KickMembers]);
 
                permissionsarray.push('Kick Members')
            }
 
            if (permissions.includes('ban') || permissions.includes('banmember')) {
                newrole.setPermissions([PermissionsBitField.Flags.BanMembers]);
 
                permissionsarray.push('Ban Members')
            }
 
            if (permissions.includes('timeout') || permissions.includes('timeoutmember')) {
                newrole.setPermissions([PermissionsBitField.Flags.KickMembers]);
 
                permissionsarray.push('Timeout Members')
            }
 
            if (permissions.includes('message') || permissions.includes('sendmessage')) {
                newrole.setPermissions([PermissionsBitField.Flags.SendMessages]);
 
                permissionsarray.push('Send Messages')
            }
 
            if (permissions.includes('messageinthread') || permissions.includes('sendmessagesinthread')) {
                newrole.setPermissions([PermissionsBitField.Flags.SendMessagesInThreads]);
 
                permissionsarray.push('Send Messages in Threads')
            }
 
            if (permissions.includes('createthread') || permissions.includes('createpublicthread')) {
                newrole.setPermissions([PermissionsBitField.Flags.CreatePublicThreads]);
 
                permissionsarray.push('Create Public Threads')
            }
 
            if (permissions.includes('createprivatethread')) {
                newrole.setPermissions([PermissionsBitField.Flags.CreatePrivateThreads]);
 
                permissionsarray.push('Create Private Threads')
            }
 
            if (permissions.includes('embedlink')) {
                newrole.setPermissions([PermissionsBitField.Flags.EmbedLinks]);
 
                permissionsarray.push('Embed Links')
            }
 
            if (permissions.includes('attachfile')) {
                newrole.setPermissions([PermissionsBitField.Flags.AttachFiles]);
 
                permissionsarray.push('Attach Files')
            }
 
            if (permissions.includes('addreaction') || permissions.includes('reaction')) {
                newrole.setPermissions([PermissionsBitField.Flags.AddReactions]);
 
                permissionsarray.push('Add Reactions')
            }
 
            if (permissions.includes('useexternalemoji') || permissions.includes('externalemoji')) {
                newrole.setPermissions([PermissionsBitField.Flags.UseExternalEmojis]);
 
                permissionsarray.push('Use External Emojis')
            }
 
            if (permissions.includes('useexternalsticker') || permissions.includes('externalsticker')) {
                newrole.setPermissions([PermissionsBitField.Flags.UseExternalStickers]);
 
                permissionsarray.push('Use External Stickers')
            }
 
            if (permissions.includes('everyone') || permissions.includes('mentioneveryone')) {
                newrole.setPermissions([PermissionsBitField.Flags.MentionEveryone]);
 
                permissionsarray.push('Mention @everyone')
            }
 
            if (permissions.includes('managemessage')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageMessages]);
 
                permissionsarray.push('Manage Messages')
            }
 
            if (permissions.includes('managethread')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageThreads]);
 
                permissionsarray.push('Manage Threads')
            }
 
            if (permissions.includes('readhistory') || permissions.includes('readmessagehistory')) {
                newrole.setPermissions([PermissionsBitField.Flags.ReadMessageHistory]);
 
                permissionsarray.push('Read Message History')
            }
 
            if (permissions.includes('sendttsmessages') || permissions.includes('tts')) {
                newrole.setPermissions([PermissionsBitField.Flags.SendTTSMessages]);
 
                permissionsarray.push('Send TTS Messages')
            }
 
            if (permissions.includes('connect')) {
                newrole.setPermissions([PermissionsBitField.Flags.Connect]);
 
                permissionsarray.push('Connet')
            }
 
            if (permissions.includes('speak')) {
                newrole.setPermissions([PermissionsBitField.Flags.Speak]);
 
                permissionsarray.push('Speak')
            }
 
            if (permissions.includes('video')) {
                newrole.setPermissions([PermissionsBitField.Flags.Stream]);
 
                permissionsarray.push('Video')
            }
 
            if (permissions.includes('useactivity') || permissions.includes('activity')) {
                newrole.setPermissions([PermissionsBitField.Flags.UseEmbeddedActivities]);
 
                permissionsarray.push('Use Activity')
            }
 
            if (permissions.includes('priority')) {
                newrole.setPermissions([PermissionsBitField.Flags.PrioritySpeaker]);
 
                permissionsarray.push('Priority Speaker')
            }
 
            if (permissions.includes('mute')) {
                newrole.setPermissions([PermissionsBitField.Flags.MuteMembers]);
 
                permissionsarray.push('Mute Members')
            }
 
            if (permissions.includes('deafen')) {
                newrole.setPermissions([PermissionsBitField.Flags.DeafenMembers]);
 
                permissionsarray.push('Deafen Members')
            }
 
            if (permissions.includes('move')) {
                newrole.setPermissions([PermissionsBitField.Flags.MoveMembers]);
 
                permissionsarray.push('Move Members')
            }
 
            if (permissions.includes('requesttospeak')) {
                newrole.setPermissions([PermissionsBitField.Flags.RequestToSpeak]);
 
                permissionsarray.push('Request to Speak')
            }
 
            if (permissions.includes('manageevent')) {
                newrole.setPermissions([PermissionsBitField.Flags.ManageEvents]);
 
                permissionsarray.push('Manage Events')
            }
 
            const rolecreate = new EmbedBuilder()
            .setColor('DarkRed')
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/icons/1078641070180675665/c3ee76cdd52c2bba8492027dfaafa15d.webp?size=1024')
            .setAuthor({ name: `💳 Role Tool`})
            .setFooter({ text: `💳 Role Created`})
            .addFields({ name: `• Role`, value: `> ${newrole}`, inline: true})
            .addFields({ name: `• Role Color`, value: `> ${color}`, inline: true})
            .addFields({ name: `• Display Separately`, value: `> ${displayside}`, inline: false})
            .addFields({ name: `• Permissions`, value: `> ${permissionsarray.join(', ').slice(0, 1000)}`, inline: false})
 
            await interaction.editReply({ embeds: [rolecreate] })
        }
    }
}