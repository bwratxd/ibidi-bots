const client = process.client;
const Schema = require("../Models/Member.js");
const auth = require("../authorization.json");

class UserUpdate {
  constructor(newUser,oldUser) {
    this.newUser = newUser;
    this.oldUser = oldUser;
  }
  
  async tagcheck (Guild) {
    let member = Guild.members.cache.get(this.newUser.id);
    if ((member.user.username.includes(auth.Tags.RealTag)) && (!member.roles.cache.get(auth.Tags.TagRol))) {
      let Nick = member.displayName.replace(auth.Tags.FakeTag, auth.Tags.RealTag);
      if ((auth.Tags.FakeTag !== "") && (member.manageable) && (member.displayName.includes(auth.Tags.FakeTag))) member.setNickname(Nick).catch(() => { });
      let goside = [auth.CezaRoles.JailRoles, auth.CezaRoles.Karantina]
      if (member.roles.cache.some(x => goside.includes(x.id))) return;
      await member.roles.add(auth.Tags.TagRol).catch(() => { });
      client.message(`
      ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
      ${member} kişisi tagımızı alarak ailemize katıldı.\n**(Toplam Taglı Üyemiz: ${Guild.members.cache.filter(x => x.user.username.includes(auth.Tags.RealTag)).size})**`, auth.Logs.TagLog)
    } else if ((!member.user.username.includes(auth.Tags.RealTag)) && (member.roles.cache.get(auth.Tags.TagRol))) {
      let Nick = member.displayName.replace(auth.Tags.RealTag, auth.Tags.FakeTag);
      let goside = [auth.CezaRoles.JailRoles, auth.CezaRoles.Karantina, auth.Perms.Vip]
      client.message(`
      ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
      ${member} kişisi tagımızı saldı.\n**(Toplam Taglı Üyemiz: ${Guild.members.cache.filter(x => x.user.username.includes(auth.Tags.RealTag)).size})**`, auth.Logs.TagLog)
      if ((auth.Tags.RealTag !== "") && (member.manageable) && (member.displayName.includes(auth.Tags.RealTag))) member.setNickname(Nick).catch(() => { });
      if ((auth.GuildData.TaglıAlım) === true) {
        if (member.roles.cache.get(auth.Perms.Booster)) {
          member.roles.cache.filter(x => Guild.roles.cache.get("839931960776065065").position < x.position).map(x => member.roles.remove(x).catch(() => { }));
          member.roles.remove(auth.Tags.TagRol).catch(() => { });
        } else {
        member.roles.cache.filter(x => Guild.roles.cache.get("839931960776065065").position < x.position).map(x => member.roles.set(auth.Perms.Unregister).catch(() => { }));
        if (member.roles.cache.some(x => goside.includes(x.id))) return member.roles.remove(auth.Tags.TagRol).catch(() => { });
        member.roles.set(auth.Perms.Unregister).catch(() => { });
        }
      } else {
        member.roles.cache.filter(x => Guild.roles.cache.get("839931960776065065").position < x.position).map(x => member.roles.remove(x).catch(() => { })); 
        member.roles.remove(auth.Tags.TagRol).catch(() => { });
      }
    }
  }
}


async function tagKontrol(oldUser, newUser) {
  let guild = client.guilds.cache.get(auth.GuildData.GuildID);
  const userControl = new UserUpdate(oldUser, newUser);
  await userControl.tagcheck(guild);
};

module.exports.event = {
  name: "userUpdate", 
  eventOn: (oldUser, newUser) => tagKontrol(oldUser, newUser)
};


