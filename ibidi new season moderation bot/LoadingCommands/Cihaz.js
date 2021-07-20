module.exports.operate = async ({client, msg, args, member ,author, auth}, {MessageEmbed} = require("discord.js")) => {                                                                                                                    
        if (!msg.member.hasPermission("VIEW_AUDIT_LOG")) return
        const ibiş = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
        if (!args[0]) return msg.channel.send("Bir üye belirt ve tekrar dene !")
        if (!ibiş) return msg.channel.send("Belirttiğin üyeyi bulamıyorum.")
        if (ibiş.presence.status == "offline") return msg.channel.send(`\`${ibiş.tag}\` kullanıcısı çevrimdışı olduğundan dolayı cihaz bilgisini tespit edemiyorum.`)
        let cihaz = ""
        let ha = Object.keys(ibiş.presence.clientStatus)
        if (ha[0] == "mobile") cihaz = "Mobil Telefon"
        if (ha[0] == "desktop") cihaz = "Masaüstü Uygulama"
        if (ha[0] == "web") cihaz = "İnternet Tarayıcısı"
        msg.channel.send(`\`${ibiş.tag}\` kullanıcısının kullandığı cihaz: \`${cihaz}\``)

    }
  
module.exports.help = {
  name: "cihaz",
alias: []
};
