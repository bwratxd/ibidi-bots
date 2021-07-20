const client = process.client;
const auth = require("../authorization.json");

class Command {
  constructor(msg) {
    this.msg = msg;
  }  

async spotiTrack(kanallar) {
    if (this.msg.author.bot || !this.msg.guild || this.msg.member.permissions.has("ADMINISTRATOR")) return;
    if (!this.msg.activity || !this.msg.activity.partyID) return;
    if (kanallar.includes(this.msg.channel.id)) return;
    if (this.msg.activity.partyID.startsWith("spotify:")) {
      await this.msg.delete();
      await this.msg.reply("Bu chatte spotify atmak yasak!").then(msg => msg.delete({ timeout: 15000 }));
    };
  }
}


module.exports.event = {
  name: "message",
  eventOn: message => new Command(message).spotiTrack(["830706173774790666"])
};