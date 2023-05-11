const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const mongoose = require("mongoose");
  
  mongoose.set("strictQuery", true);
  // Connect to Mongoose
  mongoose.connect(process.env.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // Create a model for testing purposes
  
  
  module.exports = {
    
    data: new SlashCommandBuilder()
      .setName("help")
      .setDescription("view all bot commands")
      .setDMPermission(false),
    async execute(interaction, client) {
      const icon = interaction.user.displayAvatarURL();
      const tag = interaction.user.tag;
      
  
      const embed = new EmbedBuilder()
        .setTitle("**HELP MENU!**")
        .setDescription(
          `**Help command:** \`/help\`\n | **Ping Command:** \`/pingbot\`\n | **Staff Ping System Command:** \`/ping staff-mange\`\n | **Ping Online staff Command:** \`/ping staff\`\n | **Message Clear Command:** \`/purage\`\n | **Review System Setup Command:** \`/review-setup\`\n | **Review Command:** \`/review\`\n | **Disable Review System Command:** \`/review-disable\`\n | **Role System Command:** \`/role create, /role add, /role members, /role remove\`\n | **Channel Manage System Command:** \`/channel create, /channel delete, /channel edit\`\n | **Warn System Command:** \`/warn user, /warn show, /warn remove\`\n | **Anti-link Setup Command:** \`/setup-antilink\`\n | **Birthday Commands:** \`/birthday add, /birthday delete\`\n | **Welcome Commands:** \`/welcome set, /welcome remove\`\n | **kick,ban,timeout setup Command:** \`/mod-panel\`\n | **Translate Command:** \`/translate\`\n | **Ticket Command:** \`/ticket-setup, /ticket-disable\`\n`
        )
        .setColor("Blue")
        .setFooter({ text: `Requested by ${tag}`, iconURL: icon })
        .setTimestamp();
  
      const btn = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("btn")
          .setStyle(ButtonStyle.Secondary)
          .setLabel(`Reload`)
          .setEmoji("<a:loading:1088346989160321044>")
      );
  
      const msg = await interaction.reply({ embeds: [embed], components: [btn] });
  
      const collector = msg.createMessageComponentCollector();
      collector.on("collect", async (i) => {
        if (i.customId == "btn") {
          i.update({
            content: `Refreshed The Help Page`,
            embeds: [
              new EmbedBuilder()
                .setTitle("**HELP MENU!**")
                .setDescription(
                    `**Help command:** \`/help\`\n | **Ping Command:** \`/pingbot\`\n | **Staff Ping System Command:** \`/ping staff-mange\`\n | **Ping Online staff Command:** \`/ping staff\`\n | **Message Clear Command:** \`/purage\`\n | **Review System Setup Command:** \`/review-setup\`\n | **Review Command:** \`/review\`\n | **Disable Review System Command:** \`/review-disable\`\n | **Role System Command:** \`/role create, /role add, /role members, /role remove\`\n | **Channel Manage System Command:** \`/channel create, /channel delete, /channel edit\`\n | **Warn System Command:** \`/warn user, /warn show, /warn remove\`\n | **Anti-link Setup Command:** \`/setup-antilink\`\n | **Birthday Commands:** \`/birthday add, /birthday delete\`\n | **Welcome Commands:** \`/welcome set, /welcome remove\`\n | **kick,ban,timeout setup Command:** \`/mod-panel\`\n | **Translate Command:** \`/translate\`\n | **Ticket Command:** \`/ticket-setup, /ticket-disable\`\n`
                  )
                .setColor("Blue")
                .setFooter({ text: `Requested by ${tag}`, iconURL: icon })
                .setTimestamp(),
            ],
            components: [btn],
          });
        }
      });
    },
  };