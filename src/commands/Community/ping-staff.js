const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const pingStaff = require("../../schems/staffping");

var timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping online stafff')
    .addSubcommand(command => command.setName('staff-mange').setDescription('mange the staff ping system').addRoleOption(option => option.setName('role').setDescription('mention the role').setRequired(true)))
    .addSubcommand(command => command.setName('staff').setDescription('ping all online staff member').addRoleOption(option => option.setName('role').setDescription('ping the staff').setRequired(true))),

    async execute (interaction) {
        
        
        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'staff-mange':

            if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `you dont have a permission to ping staff Require **Administrator** permission`, epheneral: true});
            else {
                const role = interaction.options.getRole('role');

                pingStaff.create({
                    Guild: interaction.guild.id,
                    RoleId: role.id,
                    RoleName: role.name
                })

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`the ping staff system has been setup with the ${role} role.`)

                await interaction.reply({ embeds: [embed], epheneral: true});

            }
                break;
                case 'staff':

                if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return await interaction.reply({ content: `you dont have a permission to ping staff Require **ManageGuild** permission`, epheneral: true});
            else {

                const input = interaction.options.getRole('role')
                const id = input.id;
                const data = await pingStaff.findOne({ Guild: interaction.guild.id });
                if (!data) return await interaction.reply({ content: `looks like ping system not enable`, epheneral: true })
                else {

                    if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `you are on cooldown try again later`, epheneral: true });

                    const members = input.members.filter((member) => {
                        const status = member.presence?.status;
                        return ['online', 'dnd', 'idle'].includes(status);
                    })

                    if (members.size === 0 ) {
                        await interaction.reply({ content: `there is no one online with the role *${input}*... try again later`, epheneral: true });
                    
                    } else {
                        const memberList = members.map((member) => member.toString()).join('\n+ ');

                        const embed = new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription("Staff Active In Server Now")

                        await interaction.reply({ embeds: [embed], content: `\>\>\> **staff ping role alert!**\n\n + ${memberList}\n\n `});

                        timeout.push(interaction.user.id);
                        setTimeout(() => {
                            timeout.shift();
                        }, 60000)
                    }

                    }
                }
        }

    }
}