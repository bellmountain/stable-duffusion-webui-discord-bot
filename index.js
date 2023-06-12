import { Client, IntentsBitField, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import env from 'dotenv'
import generateImage from './api/txt2img.js'
import { Buffer } from 'node:buffer'

const negative = 'bad anatomy,bad proportions,blurry,cloned face,cropped,deformed,dehydrated,disfigured,duplicate,error,extra arms,extra fingers,extra legs,extra limbs,fused fingers,gross proportions,jpeg artifacts,long neck,low quality,lowres,malformed,limbs missing,arms missing,legs missing,morbid,mutated hands,mutation,mutilated,out of frame,poorly drawn face,poorly drawn hands,signature,too many fingers,ugly,username,watermark,worst quality'
env.config()
 
const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
    ] 
}) 
client.on('ready',(c)=>{
    console.log(`${c.user.tag} is online`)
})
client.on('interactionCreate', async (interaction)=> {

      if(interaction.commandName === 'txt2img') {
     try { 
          const prompt = interaction.options.get('prompt').value
          const negativePrompt = interaction.options.get('negative_prompt') ? interaction.options.get('negative_prompt').value : negative 
          const seed = interaction.options.get('seed') ? interaction.options.get('seed').value : undefined
          const amount = interaction.options.get('amount') ? interaction.options.get('amount').value : 1 

          await interaction.deferReply()
          const imgData = await generateImage({
            prompt: prompt,
            negativePrompt: negativePrompt,
            seed: seed,
            amount: amount
          })
          //console.log(typeof imgData)
          //console.log(data)

          //base64 string ->
          // Convert the base64 to a buffer
          //const buffer = Buffer.from(imgData, 'base64');
          const images = imgData.images.map(
            img=>new AttachmentBuilder( Buffer.from(img,'base64') , 'test' ) 
          )
          const jsonInfo = JSON.parse( imgData.info )
          
          //console.log(jsonInfo)

          //console.log(image)
          /*
          const embed = new EmbedBuilder()
            .setTitle('Embed')
            .setDescription('description')
            //.setColor('')
            .addFields({ name: 'Field title', value: 'some value' })
          */
          //console.log(image)
          //interaction.reply(prompt + negativePrompt)
          //interaction.reply({embeds: [embed], files: [image]})
          interaction.followUp({content: 'Seed: ' + jsonInfo.seed.toString(), files: images})
          //interaction.reply(image)
          //console.log(prompt)
    } catch(ex) {
      console.log(ex)
    }
      }

})

client.login(process.env.TOKEN);


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}