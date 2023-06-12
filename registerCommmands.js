import env from 'dotenv'
import { REST, Routes, ApplicationCommandOptionType  } from 'discord.js'
env.config()


const commands = [
  {
    name: 'generate_image',
    description: 'generate an alex ai image.',
    options: [
      {
        name: 'prompt',
        description: 'the prompt',
        type: ApplicationCommandOptionType.String,
        required: true
      },{
        name: 'negative_prompt',
        description: 'the negative prompt',
        type: ApplicationCommandOptionType.String,
        //required: true
      },{
        name: 'seed',
        description: 'the seed',
        type: ApplicationCommandOptionType.Integer,
        //required: true
      }
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();