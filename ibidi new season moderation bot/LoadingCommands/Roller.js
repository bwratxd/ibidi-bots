module.exports.operate = async ({client, msg, args, member, auth}, {MessageEmbed} = require("discord.js")) => {

  if (msg.author.id !== "852913082321862706") return;
 let rolemap = msg.guild.roles.cache
 .sort((a, b) => b.position - a.position)
 .map(r => `${r.name} - (\`${r.id}\`) (\`${r.position}\`)`)
 .join("\n");
 //if (rolemap.length > 1024) rolemap = "To many roles to display";
 if (!rolemap) rolemap = "No roles";
const embed = new MessageEmbed()
.addField("Role List" , rolemap)
msg.channel.send(`${rolemap}`, {split: true});
}
  
module.exports.help = {
  name: "roller",
  alias: []
};
