module.exports.operate = async ({client, msg, args, auth, author}, {MessageEmbed} = require("discord.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.Yonetim.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
     let emb = new MessageEmbed().setColor(`2F3136`).setAuthor(`${msg.author.tag}`, msg.author.avatarURL({dynamic: true}))
     let member = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[1]));
     if(!member) return msg.channel.send(emb.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`))
     let rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[2])
     if(!rol) return msg.channel.send(`Lütfen bir rol belirt ve tekrar dene!`)
  
     if (!msg.member.hasPermission('ADMINISTRATOR')) {
     if (rol.id === "848920653653606415") return msg.channel.send(`${msg.author}`, emb.setDescription(`Yetki rolünü (<@&848920653653606415>) veremezsiniz/alamazsınız!`)).then(msg.react('858639174159433738')).then(x => x.delete({timeout: 5000})) 
     }
  
     if(member.roles.highest.position <= rol.position) return msg.channel.send(`${msg.author}`, emb.setDescription(`${member} üyesinin en yüksek rolü ${member.roles.highest}, ve bu rolden daha yüksek bir rol veremezsiniz!`)).then(msg.react('858639174159433738')).then(x => x.delete({timeout: 5000}))
     if(msg.member.roles.highest.position <= rol.position) return msg.channel.send(`${msg.author}`, emb.setDescription(`Sizin en yüksek rolünüz ${msg.member.roles.highest}, ve bu rolü veya daha yüksek bir rolü vermezsiniz!`)).then(msg.react('858639174159433738')).then(x => x.delete({timeout: 5000}))
   if (args[0] == "ver") {
       if(!member.roles.cache.has(rol)) {
await member.roles.add(rol)
msg.channel.send(emb.setDescription(`${client.react("duztik")} ${member} üyesine ${rol} rolü başarıyla verildi!`)).then(msg.react(client.react("duztik"))).then(x => x.delete({timeout: 5000}))
let kanal1 = msg.guild.channels.cache.get(auth.Logs.RolVerLog);
kanal1.send(emb.setDescription(`${client.react("duztik")} ${member} üyesine ${msg.author} tarafından ${rol} rolü başarıyla verildi!`))
       } else {
    msg.channel.send(emb.setDescription(`${client.react("iptal")} ${member} üyesinde ${rol} rolü zaten bulunmakta!`)).then(msg.react(client.react("iptal"))).then(x => x.delete({timeout: 5000}))
       }
   } else if (args[0] == "al") {
if(member.roles.cache.has(rol)) {
    msg.channel.send(emb.setDescription(`${client.react("iptal")} ${member} üyesinde ${rol} rolü yok!`)).then(msg.react(client.react("iptal"))).then(x => x.delete({timeout: 5000}))
} else {
    await member.roles.remove(rol)
    msg.channel.send(emb.setDescription(`${client.react("duztik")} ${member} üyesinden ${rol} rolü başarıyla alındı!`)).then(msg.react(client.react("duztik"))).then(x => x.delete({timeout: 5000}))
    let kanal11 = msg.guild.channels.cache.get(auth.Logs.RolVerLog);
    kanal11.send(emb.setDescription(`${client.react("duztik")} ${member} üyesine ${msg.author} tarafından ${rol} rolü başarıyla alındı!`))
}
   } else if (!args[0]) { 
       msg.channel.send(emb.setDescription(`Lütfen bir argüman belirt. \`!rol {al/ver} {user} {role}\` `))
   }
 }


module.exports.help = {
  name: "rol",
  alias: ["r"]
};
