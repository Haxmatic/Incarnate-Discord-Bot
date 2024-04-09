const mySecret = process.env['TOKEN'];
const Discord = require('discord.js');
const client = new Discord.Client();
//const auth = require('./auth.json');
//const config = require('./package.json');

client.on('ready', () => {
  console.log('Ready to spy on ' + client.users.size + ' users, in ' + client.channels.size + ' channels of ' + client.guilds.size + ' servers as ' + client.user.tag + '.');
});

client.on('message', (msg) => {
  if (msg.author.username === "Recruit") {
    let applicantName = "";
    msg.embeds.forEach((embed) => {
      applicantName = embed.fields[0].value;
      makeChannel(msg, embed.fields[0], embed.fields[0].value);
    });
    //msg.reply("Application thread created for " + applicantName);
  }
});

client.on('warn', (warn) => console.warn(warn));
client.on('error', (error) => console.error(error));

async function makeChannel(message, embed, name) {

  let channelName = (name.split("#")[0] === "") ? "new-app" : name.split("#")[0];
  //let category = message.guild.channels.find(c => c.name == "Recruitment" && c.type == "category");
  let category = message.guild.channels.find(c => c.name === "Recruitment");


  let channel = await message.guild.createChannel(channelName, { type: 'text' })
    .then(async m => {
      await m.setParent(category.id);
      await m.lockPermissions();
      m.send(embed);
      console.log
    })
    .catch(console.error);
}

client.login(mySecret);
