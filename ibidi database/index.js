const { Client } = require("discord.js");
const { connect } = require("mongoose");
const config = require("./config.json");
const model = require("./models/role.js");

const client = new Client();
const distributors = [];
let danger = true;

config.DISTRIBUTORS.forEach((token) => {
    const distributor = new Client();
    distributor
        .login(token)
        .then(() => {
            distributors.push(distributor);
            distributor.user.setActivity(config.STATUS, { type: "WATCHING" });
        })
        .catch(() => console.error(`"${token}" is not a token.`));
});

client.login(config.MAIN_BOT_TOKEN);

connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.once("ready", async () => {
    console.log(`The system is online. You can start the backup using the "${config.PREFIX}danger" command on the server.`);
    client.user.setActivity(config.STATUS, { type: "WATCHING" });

    setInterval(async () => {
        if (danger !== true) await backup();
    }, config.BACKUP_TIME * 1000 * 60);
});

client.on("roleDelete", async (role) => {
    const entry = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_DELETE" }).then((audit) => audit.entries.first());
    if (Date.now() - entry.createdTimestamp > 5000 || config.SAFE_USERS.includes(entry.executor.id)) return;

    danger = true;
    const newRole = await role.guild.roles.create({
        data: {
            name: role.name,
            color: role.hexColor,
            hoist: role.hoist,
            position: role.position,
            permissions: role.permissions,
            mentionable: role.mentionable,
        },
        reason: "Rol silindiği için yeniden oluşturuldu.",
    });

    model.updateOne({ id: role.id }, { id: newRole.id }, { upsert: true }).exec();
});

client.on("message", async (message) => {
    if (!config.SAFE_USERS.includes(message.author.id) || !message.content.startsWith(config.PREFIX)) return;

    const args = message.content.slice(config.PREFIX.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (command === "danger") {
        danger = !danger;
        if (danger === true) await backup();
        message.channel.send(danger === true ? "Yedekleme durduruldu." : "Yedekleme başlatıldı.");
    } else if (command === "backup") {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.channel.send("Geçerli bir rol belirtmelisin.");

        const data = await model.findOne({ id: role.id }).exec();
        if (!data) return message.channel.send("Belirtilen rolün verisi bulunmamaktadır.");

        message.react("👌");

        if (!data.channelOverwrites.length) message.channel.send("Belirtilen role ait kanal izinleri bulunmamaktadır.");
        else {
            data.channelOverwrites.forEach((element) => {
                const channel = message.guild.channels.cache.get(element.id);
                if (channel) channel.createOverwrite(role, element.permissions);
            });
        }

        if (!data.members.length) return message.channel.send("Belirtilen role ait üye bulunmamaktadır.");

        const slicedMembers = Math.floor(data.members.length / distributors.length);
        for (let index = 0; index < distributors.length; index++) {
            const members = data.members.slice(index * slicedMembers, (index + 1) * slicedMembers);
            if (members.length <= 0) break;

            const guild = distributors[index].guilds.cache.get(config.GUILD_ID);
            members.forEach(async (id) => {
                const member = guild.members.cache.get(id);
                if (member && !member.roles.cache.has(role.id)) await member.roles.add(role.id).catch(() => undefined);
            });
        }
    }
});

async function backup() {
    const guild = client.guilds.cache.get(config.GUILD_ID);
    if (!guild) throw new Error("Guild not found!");

    await model.deleteMany().exec();
    guild.roles.cache
        .filter((role) => !role.managed)
        .forEach(async (role) => {
            console.log(role.name);
            const channelOverwrites = [];
            guild.channels.cache
                .filter((channel) => channel.permissionOverwrites.has(role.id))
                .forEach((channel) => {
                    const permission = channel.permissionOverwrites.get(role.id);
                    channelOverwrites.push({
                        id: channel.id,
                        permissions: { ...permission.deny.serialize(), ...permission.allow.serialize() },
                    });
                });

            await model.create({
                id: role.id,
                members: role.members.map((member) => member.id),
                channelOverwrites: channelOverwrites,
            });
        });
}