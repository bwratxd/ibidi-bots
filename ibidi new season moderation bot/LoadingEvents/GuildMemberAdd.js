const Database = require("../Models/Restriction.js");
const client = process.client;
const auth = require("../authorization.json");
const { MessageAttachment, WebhookClient , MessageEmbed} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");


class Uye {
  constructor(uye) {
    this.uye = uye;
  }  
  
  async Hoşgeldin(uye) {
    let  ibidises1 = this.uye.guild.channels.cache.get("848920654052327468")
    let  ibidises2 = this.uye.guild.channels.cache.get("848920654052327469")
    let  ibidises3 = this.uye.guild.channels.cache.get("848920654052327470")
    let  ibidises4 = this.uye.guild.channels.cache.get("848920654052327472")
    let  ibidises5 = this.uye.guild.channels.cache.get("848920654052327473")
    
    var dizi = [`${ ibidises1.members.size}`, `${ ibidises2.members.size}`, `${ ibidises3.members.size}`, `${ ibidises4.members.size}`, , `${ ibidises5.members.size}`]
    
    var kanalenbuyuk = dizi.reduce( (acc, mevcut) => { return (acc < mevcut ? mevcut :acc) });
    
    let ibidiseskanallar;
    if( ibidises1.members.size == kanalenbuyuk) ibidiseskanallar =  ibidises1; else
    if( ibidises2.members.size == kanalenbuyuk) ibidiseskanallar =  ibidises2; else
    if( ibidises3.members.size == kanalenbuyuk) ibidiseskanallar =  ibidises3; else
    if( ibidises4.members.size == kanalenbuyuk) ibidiseskanallar =  ibidises4; else
    if( ibidises5.members.size == kanalenbuyuk) ibidiseskanallar =  ibidises5;     
    
    const CezaList = await Database.find({ userID: this.uye.id, Activity: true});
    let sure = (new Date().getTime() - this.uye.user.createdAt.getTime());
     if ((CezaList) && (CezaList.some(x  => x.Type === "JAIL"))) return this.uye.roles.add(auth.CezaRoles.JailRoles).catch(() => { });
     if ((CezaList) && (CezaList.some(x  => x.Type === "BAN"))) return this.uye.ban({reason: "Forbidden Member"});
     if (sure >= client.getDate(1, "hafta")) {
       await this.uye.roles.add(auth.Perms.Unregister).catch(() => { });
       if ((this.uye.user.username.includes(auth.Tags.RealTag)) && (auth.Tags.RealTag !== "")) this.uye.roles.add(auth.Tags.TagRol).catch(() => { });
       if ((CezaList) && (CezaList.some(x  => x.Type === "MUTE"))) return this.uye.roles.add(auth.CezaRoles.MuteRoles).catch(() => { });
       client.message(`:tada: **${this.uye.guild.name}**'ya hoş geldin ${this.uye.user.toString()}!
      
Hesabın **${moment(this.uye.user.createdAt).format('LLL')}** (${client.tarih(this.uye.user.createdAt)}) tarihinde oluşturulmuş.

Sunucu kurallarımız <#${auth.GuildData.Chats.Kurallar}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

  Seninle beraber **${this.uye.guild.memberCount}** kişiye ulaştık! Kayıt olmak için ${ibidiseskanallar} odasına girerek kayıt işlemini gerçekleştirebilirsin.`, auth.GuildData.Chats.KayıtChat);
    } else { // Etkinlik ve Çekilişlerimizden haberdar olmak için <#${auth.Logs.RolAlma}> kanalından rollerini almayı unutma!
// Tagımızı (\`${auth.Tags.RealTag}\`) alarak bizlere destek olabilirsin! 
       await this.uye.roles.add(auth.CezaRoles.Karantina).catch(() => { });
       client.message(new MessageEmbed().setDescription(`${this.uye.user.toString()} - \`${this.uye.id}\` üyesi sunucuya katıldı fakat hesabı \`${moment(this.uye.user.createdAt).format('LLL')}\` (${client.tarih(this.uye.user.createdAt)}) tarihinde açıldığı için <@&${auth.CezaRoles.Karantina}> rolü verildi!`)
       .setAuthor(this.uye.user.tag, this.uye.user.displayAvatarURL({dynamic: true}))
       .setColor('#460707')
       .setThumbnail(this.uye.guild.iconURL({ dynamic: true })), auth.GuildData.KayıtChat);
    }
  }
}

async function Welcome(uye) {
  let welcome = new Uye(uye);
  await welcome.Hoşgeldin();
};

module.exports.event = {
  name: "guildMemberAdd", 
  eventOn: uye => Welcome(uye)
};