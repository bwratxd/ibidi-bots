const { Collection } = require("discord.js");
const auth = require("../authorization.json");

const client = process.client;
const limits = new Collection();
const blockeds = [];

class Command {
  constructor(msg) {
    this.msg = msg;
  }

  async useCommand() {
    if (!Array.isArray(auth.GuildData.Prefixes)) auth.GuildData.Prefixes = [auth.GuildData.Prefixes];
     if (["!tag"].some(x => this.msg.content.toLowerCase().startsWith(x))) return this.msg.channel.send(auth.Tags.RealTag);
    if (!auth.GuildData.Prefixes.some(x => this.msg.content.startsWith(x.toLowerCase()))) return;
    if (this.msg.author.bot || this.msg.guild.id !== auth.GuildData.GuildID || this.msg.channel.type === "dm") return;
    let args = this.msg.content.slice(auth.GuildData.Prefixes.some(x => x.toLowerCase().length)).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let author = this.msg.guild.member(this.msg.author);
    let member = this.msg.guild.member(this.msg.mentions.users.first()) || this.msg.guild.members.cache.get(args[0]);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    };
    if (cmd) {
      if (blockeds.includes(this.msg.author.id)) return;
      
      const now = Date.now();
      const limit = limits.get(this.msg.author.id);
      if (!limit) { 
        limits.set(this.msg.author.id, {
          date: now,
          commands: [cmd.name]
        });  
      } /*else {
        limit.commands.push(cmd.name);
        if (limit.commands.filter((command) => command === cmd.name).length >= 10) {
          this.msg.reply("```⛔ Komut kullanımını kötüye kullandığın için 10 dakika bot engeli yedin...```") 
          blockeds.push(this.msg.author.id);
          setTimeout(() => {
            limits.delete(this.msg.author.id);
            const index = blockeds.indexOf(this.msg.author.id);
            if (index > -1) blockeds.splice(index, 1);
          }, 1000 * 60 * 10);
          return;
        }
      }*/
      
      cmd.operate({ client: client, msg: this.msg, args: args, author: author, member: member, auth: auth });
    };
  }
}

module.exports.event = {
  name: "message",
  eventOn: message => new Command(message).useCommand()
};