import env from 'dotenv'
import { REST, Routes, ApplicationCommandOptionType  } from 'discord.js'
env.config()


const commands = [
  {
    name: 'txt2img',
    description: 'generate an alex ai image.',
    options: [
      {
        name: 'prompt',
        description: 'the prompt',
        type: ApplicationCommandOptionType.String,
        required: true
      },{
        name: 'negative_prompt',
        description: 'negative prompt. default: bad anatomy,bad proportions,blurry,cloned face,cropped,deformed,dehydrated,disfigured,duplicate,error,extra arms,extra fingers,extra legs,extra limbs,fused fingers,gross proportions,jpeg artifacts,long neck,low quality,lowres,malformed,limbs missing,arms missing,legs missing,morbid,mutated hands,mutation,mutilated,out of frame,poorly drawn face,poorly drawn hands,signature,too many fingers,ugly,username,watermark,worst quality',
        type: ApplicationCommandOptionType.String,
      },{
        name: 'seed',
        description: 'the seed',
        type: ApplicationCommandOptionType.Integer,
      },{
        name: 'amount',
        description: 'amount of images to be generated maximum 4',
        type: ApplicationCommandOptionType.Integer,
        minValue: 1,
        maxValue: 4
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