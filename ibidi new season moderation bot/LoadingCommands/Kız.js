module.exports.operate = async ({client, msg, args, auth, author, member}, Schema = require("../Models/Member.js")) => {
  if ((!author.roles.cache.some(r => auth.Perms.RegisterAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
  if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
  if (((auth.GuildData.TaglıAlım) === true) && (!member.user.username.includes(auth.Tags.RealTag)) & (!member.roles.cache.get(auth.Perms.Vip)) & (!member.roles.cache.get(auth.Booster)) & (!member.roles.cache.get(auth.Talent.Codelian))) return client.message(client.embed(`Şu an taglı alımda bulunuyoruz, kayıt olabilmek için tagımıza (\`${auth.Tags.RealTag}\`) sahip olman ya da boost basman gerekli.` ,msg),msg.channel.id, 6500); // & (!member.roles.cache.get(auth.Perms.ibidi)) & (!member.roles.cache.get(auth.Perms.Vip))
  if (member.roles.cache.some(x => auth.Perms.KızErkek.includes(x.id))) return client.message(client.embed(`Bu kullanıcı zaten <@&${auth.Perms.Erkek[0]}> ya da <@&${auth.Perms.Kız[0]}> rolüne sahip eğer bir sorun var ise üst yönetime ulaşabilirsin.`, msg), msg.channel.id, 6500);
  const isim = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
  const yas = args.slice(1).filter(arg => !isNaN(arg))[0];
  const tag = member.user.username.includes(auth.Tags.RealTag) ? auth.Tags.RealTag : (auth.Tags.FakeTag === "" ? auth.Tags.RealTag : auth.Tags.FakeTag);
  let Veri = await Schema.findOne({SunucuID: msg.guild.id, userID: member.id})
  if ((!isim) && (yas)) return client.message(client.embed(`Kullanıcının herhangi bir ismi olmadan yaşını belirleyemezsin`,msg), msg.channel.id, 6500);
  if ((isim) && (!yas)) {
    member.setNickname(`${tag} ${isim}`).catch(() => { });
      if (!Veri) { new Schema({SunucuID: msg.guild.id, userID: member.id, History: [{ Name: `${tag} ${isim}`, Roles: auth.Perms.Kız[0], Author: author.id }]}).save();
    } else {
      Veri.History.push({ Name: `${tag} ${isim}`, Roles: auth.Perms.Kız[0], Author: author.id});
      Veri.save();
    };
   } else if ((isim) || (yas)) {
    member.setNickname(`${tag} ${isim} | ${yas}`).catch(() => { });
    if (!Veri) { new Schema({SunucuID: msg.guild.id, userID: member.id, History: [{ Name: `${tag} ${isim} | ${yas}`, Roles: auth.Perms.Kız[0], Author: author.id }]}).save();
    } else {
      Veri.History.push({ Name: `${tag} ${isim} | ${yas}`, Roles: auth.Perms.Kız[0], Author: author.id});
      Veri.save();
    };
  };
  client.Kayıt(msg, args, member, author, auth.Perms.Kız, auth.Perms.Erkek, auth);
  Schema.findOne({SunucuID: msg.guild.id, userID: author.id}, async (err,res) => {
    if (!res) { new Schema({SunucuID: msg.guild.id, userID: author.id, Authorized: { Man: 1, Members: [member.id]}}).save()
  } else {
    res.Authorized.Man++
    res.Authorized.Members.push(member.id);
    res.save();
  }
  });
  msg.react(client.react("duztik")).catch(() => { });
};
    
  module.exports.help = {
    name: "k",
    alias: ["kız", "karı", "kadın"]
  };
 