module.exports.operate = async ({client, msg, args,auth, author}) => {
    if ((!author.roles.cache.some(r => auth.Perms.Yonetim.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    const type = args[0];
    let RolsuzMembers = msg.guild.members.cache.filter(x => (x.roles.cache.size) == 1).array();
    if (!type) return client.message(client.embed(`Sunucuda rolü olmayan (\`${RolsuzMembers.length}\`) kişi bulunuyor. Bu kişilere kayıtsız rolü vermek için __[ rolsüz ver ]__ komutunu kullanın.\n────────────\n${RolsuzMembers.length < 30 ? RolsuzMembers.join(",") : `Sunucuda 30 kişiden fazla rolsüz olduğu için sadece 30 kişiyi gösterebilirim.\n${RolsuzMembers.slice(0, 30).join(",")}`}`, msg), msg.channel.id, 7500);
    else if (["ver", "dağıt"].includes(type)) {
        RolsuzMembers.forEach((member, index) => {
            setTimeout(() => {
                member.roles.add(auth.Perms.Unregister).catch();
            }, index * 750)
        });
    };
}
    
  module.exports.help = {
    name: "rolsüz",
    alias: []
  };


 