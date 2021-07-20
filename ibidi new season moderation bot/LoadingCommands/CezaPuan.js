module.exports.operate = async ({client, msg, args,auth, author}, fetch = require('node-fetch'), Schema = require("../Models/Member.js")) => {
  let member = (msg.mentions.users.first()) || await (await fetch(`https://discord.com/api/users/${args[0]}`, {method:'GET', headers: {'Authorization': 'Bot ' + client.token}})).json();
  if ((!member) || (Object.keys(member).length == 1)) return client.message(client.noMember(msg), msg.channel.id, 6500);
  let cezaPuan = await Schema.findOne({SunucuID: msg.guild.id, userID: member.id})
  if (!cezaPuan) return client.message(`\`\`\`Bu kullanıcı herhangi bir ceza puanına sahip değil\`\`\``, msg.channel.id, 6500);
  client.message(`<@${member.id}> \`\`\`Bu kullanıcının toplam ceza puanı ${cezaPuan.CezaPuan}.\`\`\``, msg.channel.id, 6500);
  msg.react(client.react("duztik")).catch(() => { });
  };
    
  module.exports.help = {
    name: "cezapuan",
    alias: []
  };
 

 