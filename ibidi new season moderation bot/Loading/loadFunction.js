module.exports = (client, auth, moment) => {

    client.renk = new Array("#1f0524", "#0b0067", "#4a0038", "#07052a", "#FFDF00", "#00FFFF", "#0091CC", "#0047AB", "#384B77", "#ffffff", "#000000", "#04031a", "#f9ffba");

    client.message = (content, Channel, timeout) => {
    const channel = client.channels.cache.get(Channel);
      if (!timeout) {
        if (channel) channel.send(content).catch(() => { });
      } else {
        if (channel) channel.send(content).then((msg) => msg.delete({ timeout: timeout })).catch(() => { });
      }
    };
  
    client.Kayıt = async (msg, args, member, author, rolID, rol2ID, auth) => {
      await member.roles.remove(auth.Perms.Unregister).catch(() => { });
      await member.roles.add(rolID).catch(() => { });
      await client.message(client.embed(`${member} kullanıcısı başarıyla <@&${rolID[0]}> alarak kaydedildi! İyi Eğlenceler :tada: :tada: :tada:`, msg), msg.channel.id, 3500);
      if (client.channels.cache.get(auth.GuildData.Chats.GenelChat)) client.message(`${auth.Reacts.star2} Aramıza yeni birisi katıldı! ${member} Hadi ona hoşgeldin diyelim :tada:`, auth.GuildData.Chats.GenelChat, 7500);
    };
  
    client.Talent = async (msg, member, author, rol) => {
      if ((!author.roles.cache.some(r => auth.Perms.TalentAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
      if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
      await member.roles.cache.has(rol) ? member.roles.remove(rol) : member.roles.add(rol).catch(() => { });
      await msg.react(client.react("duztik")).catch(() => { });
      client.message(client.embed(`${member} adlı üyede <@&${rol}> permi için gerekli işlemler yapılmıştır.`, msg), msg.channel.id, 4500);
      return client.message(client.embed(`${author} adlı yetkili ${member} (\`${member.id}\`) adlı kullanıcıya <@&${rol}> permi için gerekli işlemler yapılmıştır.`, msg), auth.GuildData.Chats.AbilityLog)
    }
  
    client.embed = (message, msj) => {
        return {
          embed: {
          author: { name: msj.guild.member(msj.author).user.username, icon_url: msj.author.displayAvatarURL({dynamic: true}) },
          description: message,
          color: client.renk[Math.floor(Math.random() * client.renk.length)],
        }
      };
    };

    client.noMember = (message) => {
        return {
          embed: {
            author: { name: message.guild.member(message.author).user.username, icon_url: message.author.displayAvatarURL({dynamic: true}) },
            description: `Kullanıcıyı düzgün etiketlediğinden emin olmalısın. `,
            color: client.renk[Math.floor(Math.random() * client.renk.length)],
        }
      };
    };

    client.react = function(x) {
        return client.emojis.cache.get(auth.Reacts[x]);
    };

    client.format = sure => {
        return moment.duration(sure).format("D [gün,] H [saat,] m [dakika,] s [saniye.]");
    };
     
    client.toDate = date => {
        return moment(date).format("HH:mm:ss DD/MM/YYYY");
    };
     
    client.NumberAdd = ({Database, Message, Type}) => {
        Database.findOne({SunucuID: Message.guild.id, userID: Message.author.id}, async (err, res) => {
          if (!res) {
            if (Type === "BanAdd") {
              new Database({SunucuID: Message.guild.id , userID: Message.author.id, RestNumber: { BanNumber: 1 }}).save();
            } else if (Type === "JailAdd") {
              new Database({SunucuID: Message.guild.id, userID: Message.author.id, RestNumber: { JailNumber: 1 }}).save();
            } else if (Type === "MuteAdd") {
              new Database({SunucuID: Message.guild.id, userID: Message.author.id, RestNumber: { MuteNumber: 1 }}).save();
            } else if (Type === "VMuteAdd") {
              new Database({SunucuID: Message.guild.id, userID: Message.author.id, RestNumber: { VMuteNumber: 1 }}).save();
            };
          } else {
           if (Type === "BanAdd") {
              res.RestNumber.BanNumber = Number(res.RestNumber.BanNumber + 1);
              res.save();
            } else if (Type === "JailAdd") {
              res.RestNumber.JailNumber = Number(res.RestNumber.JailNumber + 1);
              res.save();

            } else if (Type === "MuteAdd") {
              res.RestNumber.MuteNumber = Number(res.RestNumber.MuteNumber + 1);
              res.save();
            } else if (Type === "VMuteAdd") {
              res.RestNumber.VMuteNumber = Number(res.RestNumber.VMuteNumber + 1);
              res.save();
            };
          };
        });
      };
      client.chunkArray = (arr, chunkSize) => {
        const chunks = [];
        let currentChunk = [];
        for (let i = 0; i < arr.length; i++) {
          currentChunk.push(arr[i]);
          if ((i !== 0 && i % chunkSize === 0) || i === arr.length - 1) {
            chunks.push(currentChunk);
            currentChunk = [];
          };
        };
        return chunks;
      };

      client.clean = text => {
        if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 0 });
        text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
      };
  
  client.getDate = (date, type) => {
let sure;
date = Number(date);
if (type === "saniye") { sure = (date * 1000) }
else if (type === "dakika") { sure = (60 * 1000) * date }
else if (type === "saat") { sure = ((60 * 1000) * 60) * date }
else if (type === "gün") { sure = (((60 * 1000) * 60) * 24) * date }
else if (type === "hafta") { sure = ((((60 * 1000) * 60) * 24) * 7) * date }
else if (type === "ay") { sure = ((((60 * 1000) * 60) * 24) * 30) * date }
else if (type === "yıl") { sure = ((((((60 * 1000) * 60) * 24) * 30) * 12) + 5) * date };
return sure;
};


      Array.prototype.chunk = function(chunk_size) {
        let myArray = Array.from(this);
        let tempArray = [];
        for (let index = 0; index < myArray.length; index += chunk_size) {
          let chunk = myArray.slice(index, index + chunk_size);
          tempArray.push(chunk);
        };
        return tempArray;
      };
  
  client.tarih = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
  
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
  
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat`
    else if (mins > 0) string += `${mins} dakika`
    else string += `bir kaç saniye`;
  
    string = string.trim();
    return `\`${string} önce\` `;
  };
  
};

