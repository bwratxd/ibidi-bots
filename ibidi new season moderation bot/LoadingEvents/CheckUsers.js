const client = process.client;
const auth = require("../authorization.json");
const Database = require("../Models/Restriction.js");
const Schema = require("../Models/Member.js");

class CheckUser {
  constructor(guild) {
    this.guild = guild;
  }
  
 async ChatMute() {
   Database.find({Activity: true, Type: "MUTE"}, (err, res) => {
     if ((!res) || (res.length < 1)) return null;
       res.forEach(x => {
         let user = this.guild.members.cache.get(x.userID);
         if (Date.now() >= x.FinishDate) {
         if ((user) && (user.roles.cache.get(auth.CezaRoles.MuteRoles))) user.roles.remove(auth.CezaRoles.MuteRoles).catch(() => { });
         x.Activity = false;
         x.save();
       } else {
         if ((user) && (!user.roles.cache.get(auth.CezaRoles.MuteRoles))) user.roles.add(auth.CezaRoles.MuteRoles).catch(() => { });
       };
      });
    });
  }
  
 async VoiceMute() {
    Database.find({Activity: true, Type: "VOICEMUTE"}, (err, res) => {
     if ((!res) || (res.length < 1)) return null;
       res.forEach(x => {
         let user = this.guild.members.cache.get(x.userID);
         if (Date.now() >= x.FinishDate) {
         if ((user) && (user.voice.channel) && (user.voice.serverMute)) user.voice.setMute(false).catch(() => { });
         x.Activity = false;
         x.save();
       } else {
         if ((user) && (user.voice.channel) && (!user.voice.serverMute)) user.voice.setMute(true).catch(() => { });
       };
      });
    });
  }
  
 async PermaJail() {
    Database.find({Activity: true, Type: "JAIL"}, (err, res) => {
     if ((!res) || (res.length < 1)) return null;
      res.forEach(x => {
       let user = this.guild.members.cache.get(x.userID);
       if ((user) && (!user.roles.cache.get(auth.CezaRoles.JailRoles))) user.roles.set(user.roles.cache.get(auth.Booster) ? [auth.Booster, auth.CezaRoles.JailRoles] : [auth.CezaRoles.JailRoles]).catch(() => { });
      });
    });
  }

  
 async PermaReklam() {
    Database.find({Activity: true, Type: "REKLAM"}, (err, res) => {
     if ((!res) || (res.length < 1)) return null;
      res.forEach(x => {
       let user = this.guild.members.cache.get(x.userID);
       if ((user) && (!user.roles.cache.get(auth.CezaRoles.ReklamRoles))) user.roles.set(user.roles.cache.get(auth.Booster) ? [auth.Booster, auth.CezaRoles.ReklamRoles] : [auth.CezaRoles.ReklamRoles]).catch(() => { });
      });
    });
  }
  
 async Tags() {
   let Tags = this.guild.members.cache.filter(u => (u.user.username.includes(auth.Tags.RealTag)) && (!u.roles.cache.get(auth.Tags.TagRol))).map(gmember => gmember.id);
   let NoTags = this.guild.members.cache.filter(u => (!u.user.username.includes(auth.Tags.RealTag)) && (u.roles.cache.get(auth.Tags.TagRol))).map(gmember => gmember.id);
   console.log(Tags + " taglılar")
   console.log(NoTags + " tagsızlar")
   if (Tags.length >= 1) {
     Tags.forEach(async member => {
       let user = this.guild.members.cache.get(member);
       let Symbol = user.displayName.replace(auth.Tags.FakeTag, auth.Tags.RealTag);
       let goside = [auth.CezaRoles.JailRoles, auth.CezaRoles.Karantina]
       if (user.roles.cache.some(x => goside.includes(x.id))) return;
       await user.roles.add(auth.Tags.TagRol).catch(() => { });
       if ((auth.Tags.FakeTag !== "") && (user.manageable) && (user.displayName.includes(auth.Tags.FakeTag))) user.setNickname(Symbol).catch(() => { });
     })
   };
  if (NoTags.length >= 1) {
    NoTags.forEach(member => {
      let user = this.guild.members.cache.get(member);
      let Symbol = user.displayName.replace(auth.Tags.RealTag, auth.Tags.FakeTag);
      let goside = [auth.CezaRoles.JailRoles, auth.CezaRoles.Karantina, auth.Perms.Vip]
      if ((auth.Tags.RealTag !== "") && (user.manageable) && (user.displayName.includes(auth.Tags.RealTag))) user.setNickname(Symbol).catch(() => { });
      if ((auth.GuildData.TaglıAlım) === true) {
        if (user.roles.cache.get(auth.Perms.Booster)) {
        user.roles.cache.filter(x => this.guild.roles.cache.get("839931960776065065").position < x.position).map(x => user.roles.remove(x).catch(() => { }));
        user.roles.remove(auth.Tags.TagRol).catch(() => { });
        } else {
        user.roles.cache.filter(x => this.guild.roles.cache.get("839931960776065065").position < x.position).map(x => user.roles.remove(x).catch(() => { }));
        if (user.roles.cache.some(x => goside.includes(x.id))) return user.roles.remove(auth.Tags.TagRol).catch(() => { });
        user.roles.set(auth.Perms.Unregister).catch(() => { });
        }
      } else {
        user.roles.cache.filter(x => this.guild.roles.cache.get("839931960776065065").position < x.position).map(x => user.roles.remove(x).catch(() => { })); 
        user.roles.remove(auth.Tags.TagRol).catch(() => { });
      }
    });
  };  
 }
  
  CezaPuan() {
    Schema.find({SunucuID: this.guild.id}, (err, res) => {
      if ((!res) || (res.length < 1)) return null;
        res.forEach(x => {
          let user = this.guild.members.cache.get(x.userID);
          if (x.CezaPuan >= 80) {
          if ((user) && (!user.roles.cache.get(auth.CezaRoles.JailRoles))) {
          user.roles.set(user.roles.cache.get(auth.Booster) ? [auth.Booster, auth.CezaRoles.JailRoles] : [auth.CezaRoles.JailRoles]).catch(() => { });
          Database.countDocuments().then(number => {
          let Numb = 0;
          Numb = (number + 1);
          new Database({CezaID: Numb, Type: "JAIL", userID: user.id, Author: client.user.id, Reason: `+80 Ceza Puanı`, DateNow: Date.now(), Activity: true}).save();
             });
            }
          }
        });
    });
  }
}

function checkUsers() {
  let guild = client.guilds.cache.get(auth.GuildData.GuildID);
  let userChecker = new CheckUser(guild);
  setInterval(() => userChecker.ChatMute(), client.getDate(5, "saniye"));
  setInterval(() => userChecker.VoiceMute(), client.getDate(10, "saniye"));
  setInterval(() => userChecker.PermaJail(), client.getDate(5, "dakika"));
  setInterval(() => userChecker.Tags(), client.getDate(15, "dakika"))
  //setInterval(() => userChecker.CezaPuan(), client.getDate(5, "dakika"));
};

module.exports.event = {
  name: "ready",
  eventOn: () => checkUsers()
};