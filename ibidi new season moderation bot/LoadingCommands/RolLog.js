module.exports.operate = async ({client, msg, args, author, auth}, fetch = require('node-fetch'), Discord = require("discord.js"), Database = require("../Models/Member.js"), roller = require("../Models/Rol.js"), RoleDatabase = require("../Models/Rol.js"), moment = require("moment")) => {

  let embed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true }))
  let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
  if(!member) return msg.channel.send(embed.setDescription(`Rol bilgilerine bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene!`))
  RoleDatabase.findOne({ guildID: msg.guild.id, kullanıcıID: member.id }, async (err, res) => {
  res.rolveridb.sort((a, b) => b.tarih - a.tarih).length > 10 ? res.rolveridb.sort((a, b) => b.tarih - a.tarih).length = 10 : res.rolveridb.sort((a, b) => b.tarih - a.tarih).length = res.rolveridb.sort((a, b) => b.tarih - a.tarih).length
  let listening = res.rolveridb.map((v, i) => ` ${v.type}   Rol: ${msg.guild.roles.cache.get(v.rolid)} Yetkili: ${msg.guild.members.cache.get(v.staffID)}\n Tarih: ${moment(v.tarih).format("LLL")}`).join("\n─────────────────\n")

  msg.channel.send(embed.setDescription(`${member} kişisinin toplamda **${res.rolveridb.length ? res.rolveridb.length : "0" }** rol bilgisi bulunmakta son 10 rolün bilgileri aşağıda belirtilmiştir.\n\n${listening}`))
    })
  };

module.exports.help = {
    name: "rollog",
    alias: []
  };

