module.exports.operate = async ({client, msg, args, member, auth, author}) => {
  if ((!author.roles.cache.some(r => auth.Perms.RegisterAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
  if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
  const isim = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
  const yas = args.slice(1).filter(arg => !isNaN(arg))[0];
  const tag = member.user.username.includes(auth.Tags.RealTag) ? auth.Tags.RealTag : (auth.Tags.FakeTag === "" ? auth.Tags.RealTag : auth.Tags.FakeTag);
  if ((!isim) && (yas)) return client.message(client.embed(`${client.react("iptal")} | Kullanıcının herhangi bir ismi olmadan yaşını belirleyemezsin`,msg), msg.channel.id, 6500);
  if ((!isim) && (!yas)) return client.message(client.embed(`${client.react("iptal")} | Geçerli bir isim ya da yaş girmelisin.` ,msg), msg.channel.id, 6500);
  if ((isim) && (!yas)) {
    member.setNickname(`${tag} ${isim}`)
  } else if ((isim) && (yas)) {
    member.setNickname(`${tag} ${isim} | ${yas}`);
  };
  msg.react(client.react("duztik")).catch(() => { })
  };
    
  module.exports.help = {
    name: "isim",
    alias: ["i", "nick"]
  };


 