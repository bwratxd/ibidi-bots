module.exports.operate = async ({client, msg, args, member ,author, auth}, {MessageEmbed} = require("discord.js")) => { 
  const ibiş = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  msg.channel.send(ibiş.displayAvatarURL({ dynamic: true, size: 2048}));
};
  
module.exports.help = {
  name: "avatar",
alias: ["gig","gif","pp","bb"]
};
