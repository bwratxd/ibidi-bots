module.exports.operate = async ({client, msg, args, author, auth}) => {
    if (!auth.GuildData.BotOwners.includes(author.id)) return null;
    if (!args[0] || args[0].includes("token")) return;
    const code = args.join(" ");
    try {
      var evaled = client.clean(await eval(code));
      if (evaled.match(new RegExp(`${client.token}`, "g")))
      evaled.replace("token", "xd").replace(client.token, "xd");
      msg.channel.send(`${evaled.replace(client.token, "xd")}`, {
        code: "js",
        split: true 
      }).catch(err => msg.channel.send(err.message));
    } catch (err) {
      msg.channel.send(err, { code: "js", split: true });
    };
};

module.exports.help = {
    name: "eval",
    alias: []
  };

  
