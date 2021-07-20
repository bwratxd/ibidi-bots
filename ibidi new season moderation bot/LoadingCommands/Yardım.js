module.exports.operate = async ({client, msg, args, member ,author, auth, prop}, {MessageEmbed} = require("discord.js")) => { 
        if(!msg.member.hasPermission("ADMINISTRATOR")) return
    let list = client.commands
    .set((x) => prop.help.name)
    .sort((a, b) => b.prop.help.name - a.prop.help.name)
    .map((x) => `\`.${prop.help.name}\``)
    .join("\n");

  msg.channel.send(new MessageEmbed().setThumbnail(msg.guild.iconURL({dynamic: true})).setColor(client.renk[Math.floor(Math.random() * client.renk.length)]).setDescription(list));
}
module.exports.help = {
  name: "commands",
alias: []
};
