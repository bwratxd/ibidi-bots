module.exports.operate = async ({client, msg, args, member, auth, author}, ms = require("ms"), Discord = require("discord.js"), Database = require("../Models/Restriction.js"), Schema = require("../Models/Member.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.Yonetim.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    let {tag} = args[0];
    let etiket = args[1]; 
    let rol = msg.guild.roles.cache.get(args[2]);
    msg.guild.members.cache.filter(s => s.user.discriminator === etiket || s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    msg.channel.send(`
Kullanıcı adında \`${tag}\` ve etiketinde \`#${etiket}\` bulunduran kullanıcılara \`${rol.name}\` adlı rol veriliyor.
`)
}
  
module.exports.help = {
  name: "trol",
  alias: []
};
