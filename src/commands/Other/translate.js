const {
    SlashCommandBuilder
} = require('discord.js');
const translate = require('translate-google');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Use the translation system to translate individual words or even entire sentences.')
    
    .addStringOption(stringOption => stringOption
        .setName('text')
        .setDescription('What do you want to translate?')
        
        .setRequired(true))
    .addStringOption(stringOption => stringOption
        .setName('to')
        .setDescription('What language do you want to translate it into?')
        
        .setRequired(true)

        .addChoices(
            {
                name: 'Afrikaans',
                value: 'af',
            },
            {
                name: 'Albanian',
                value: 'sq',
            },
            {
                name: 'Arabic',
                value: 'ar',
            },
            {
                name: 'Armenian',
                value: 'hy',
            },
            {
                name: 'Azerbaijani',
                value: 'az',
            },
            {
                name: 'Basque',
                value: 'eu',
            },
            {
                name: 'Belarusian',
                value: 'be',
            },
            {
                name: 'Bengali',
                value: 'bn',
            },
            {
                name: 'Bosnian',
                value: 'bs',
            },
            {
                name: 'Bulgarian',
                value: 'bg',
            },
            {
                name: 'Croatian',
                value: 'hr',
            },
            {
                name: 'Czech',
                value: 'cs',
            },
            {
                name: 'English',
                value: 'en',
            },
            {
                name: 'Georgian',
                value: 'ka',
            },
            {
                name: 'German',
                value: 'de',
            },
            {
                name: 'Hebrew',
                value: 'iw',
            },
            {
                name: 'Italian',
                value: 'it',
            },
            {
                name: 'Latin',
                value: 'la',
            },
            {
                name: 'Polish',
                value: 'pl',
            },
            {
                name: 'Romanian',
                value: 'ro',
            },
            {
                name: 'Russian',
                value: 'ru',
            },
            {
                name: 'Serbian',
                value: 'sr',
            },
            {
                name: 'Turkish',
                value: 'tr',
            },
        )),

    async execute(interaction) {

        const { options } = interaction;

        const text = options.getString('text');
        const to = options.getString('to');

        await interaction.reply(
            {
                content: 'Your message is being translated, please wait 3 seconds…',
                ephemeral: true
            }
        );

        setInterval(async () => {
            await translate(`${text}`, {
                to: `${to}`
            }).then(result => {
                interaction.editReply(
                    {
                        content: `${result}`,
                        ephemeral: true
                    }
                );
            }).catch(error => {
                console.log(error);
            });
        }, 3000);

    },
};