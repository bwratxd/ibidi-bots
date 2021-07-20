module.exports.operate = async ({client, msg, author, member, auth}, Discord = require("discord.js"), moment = require("moment"), {MessageEmbed} = require("discord.js")) => {
    let mention = msg.author;
    if(msg.mentions.members.first()) mention = msg.mentions.members.first().user;
    let mentionMember = msg.guild.members.cache.get(mention.id);
    let slm = {
        web: 'Tarayıcı',
        desktop: 'Bilgisayarda',
        mobile: 'Telefonda'
      }
      let sa;
      if(mention.presence.status === "offline" || mention.bot) {
        sa = "Hangi Cihazdan Girdiğini Göremiyorum"
      } else {
        sa = slm[Object.keys(mention.presence.clientStatus)[0]];
      } 
  let flags = msg.author.flags.toArray()
  let uflags = flags.map(x => x.toString()).join(",");
   uflags = uflags.replace("HOUSE_BRAVERY", ":rozet_bravery: HypeSquad Bravery")
   uflags = uflags.replace("HOUSE_BALANCE",":rozet_balance:  HypeSquad Balance")
   uflags = uflags.replace("DISCORD_PARTNER",":rozet_partner: Partner")
   uflags = uflags.replace("HYPESQUAD_EVENTS",":rozet_hypesquad: Hypesquad Event")
   uflags = uflags.replace("EARLY_SUPPORTER",":rozet_early: Early Supporter")
   uflags = uflags.replace("VERIFIED_DEVELOPER",":rozet_developer: Verified Bot Developer")
  uflags = uflags.replace("HOUSE_BRILLIANCE",":rozet_brillance: HypeSquad Brilliance")
  if(flags == ""){
    uflags = "Rozet bulunamadı"
  }
const xd = new Discord.MessageEmbed()
.setAuthor(`${mention.tag}`, mention.avatarURL({ dynamic: true}))
.setThumbnail(mention.avatarURL({ dynamic: true}))
.setDescription(`**• Kullanıcı bilgisi**
\`Kullanıcı ID\` **•** ${mention.id}
\`Profil\` **•** ${mention} ${mention.presence.status.replace('online', 'Çevrim İçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrim Dışı')}
\`Bağlandığı yer\` **•** ${sa}
\`Kuruluş Tarihi\` **•** ${moment(mention.createdAt).format('D/MMMM/YYYY')}
**• Kullanıcı bilgisi**
\`Takma Ad\` **•** **${mentionMember.displayName}**
\`Sunucuya Giriş Tarihi\` **•** ${moment(mentionMember.joinedAt).format('D/MMMM/YYYY')}
\`Roller\` **•** ${(mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}
`)
.setFooter(mention.username, mention.avatarURL({dynamic: true}))
.setTimestamp()
.setColor(client.renk[Math.floor(Math.random() * client.renk.length)])
msg.channel.send(xd)
};
 
module.exports.help = {
    name: "kullanicibilgi",
    alias: ["kbilgi","kullanici"]
  };
