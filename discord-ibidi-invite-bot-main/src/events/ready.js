const client = global.client;

module.exports = async () => {
  client.guilds.cache.forEach(async (guild) => {
    const invites = await guild.fetchInvites();
    client.invites.set(guild.id, invites);
  });
  client.user.setActivity("Lêmperouge ` #1984");
  console.log(client.user.tag)
      let botVoiceChannel = client.channels.cache.get("844162652804481025");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
};

module.exports.conf = {
  name: "ready",
};
