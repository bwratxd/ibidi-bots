const Discord = require("discord.js");
const axios = require("axios")
const client = new Discord.Client();
const ms = require("ms")
client.rolLimit = new Map();
client.kanalKoruma = new Map();
client.rolName = new Map()
client.ownerst = ["282238108739567647", "863753700735844382", "225131604828225536"]; // KURUCU
client.evulate = []
client.channelLimit = new Map()
client.channelName = new Map()
client.blackList = []
client.banLimit = new Map()
client.roleBackup = new Map()
client.roleCreate = new Map()
client.botAccounts = ["863748750828503060","809207297980235826", "863756012204589066"] // Güvenli bot ID
client.botroles = [] // YLER GİDİNCE YETKİSİ GİTMİYECEK BOTLARIN ID
let kanal = "864837999525888050" // LOG KANAL
let ustKanal = "864837999525888050" // YETKİSİ YETMEYİNCE BLABLA

client.on("ready", () => {
    client.user.setActivity("Cullen ❤️ ibidi.");
    console.log(client.user.tag)
    let botVoiceChannel = client.channels.cache.get("864837930446487572");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
})

client.on("roleDelete", async (role) => {
    await role.guild.fetchAuditLogs({
        type: "ROLE_DELETE"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let yapan = ayar.executor
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (client.ownerst.includes(yapan.id)) return
        client.channels.cache.get(kanal).send(`⛔ <@${yapan.id}> | (\`${yapan.id}\`) kişisi bir rol sildi ve yasaklandı!`)
        let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
        role.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && role.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
            // client.roleBackup.set(huh.id, huh.permissions.bitfield)
            huh.setPermissions(0)
        })
        await role.guild.members.ban(yapan.id, {
            reason: "Rol silmek"
        }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> rol sildi fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
        client.blackList.push(yapan.id)
    })
});

client.on("channelDelete", async (channel) => {
    await channel.guild.fetchAuditLogs({
        type: "CHANNEL_DELETE"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let yapan = ayar.executor
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (client.ownerst.includes(yapan.id)) return
        client.channels.cache.get(kanal).send(`⛔ <@${yapan.id}> | (\`${yapan.id}\`) kişisi ${channel.name} isimli kanalı sildi ve yasaklandı!`)
        let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
        channel.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && channel.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
            //  client.roleBackup.set(huh.id, huh.permissions.bitfield)
            huh.setPermissions(0)
        })
        await channel.guild.members.ban(yapan.id, {
            reason: "Kanal silmek"
        }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> kanal sildi fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
        client.blackList.push(yapan.id)
    })
});

client.on("guildUnavailable", async (guild) => {
    let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
    guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
        // client.roleBackup.set(huh.id, huh.permissions.bitfield)
        huh.setPermissions(0)
    })
    client.channels.cache.get(kanal).send(`Sunucu kullanılamaz hale geldiği için koruma amacıyla yetkileri kapadım!`)
});

client.on("guildMemberAdd", async (member) => {
    if (!member.user.bot) return
    if (!client.botAccounts.includes(member.id)) {
        await member.guild.members.ban(member.id, {
            reason: "Bot izin verilen botlar listesinde bulunmuyor"
        })
        client.channels.cache.get(kanal).send(`🔑 <@${member.id}> | (\`${member.id}\`) botu sunucuya izinsiz bir şekilde eklendi ve yasaklandı!`)
        let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
        member.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && member.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
            client.roleBackup.set(huh.id, huh.permissions.bitfield)
            huh.setPermissions(0)
        })
    }
})

client.on("guildBanAdd", async (guild, member) => {
    await guild.fetchAuditLogs({
        type: "MEMBER_BAN_ADD"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let yapan = ayar.executor
        let hedef = ayar.target
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (yapan.id == client.user.id) return
        if (client.ownerst.includes(yapan.id)) return
        let banLimit = client.banLimit.get(yapan.id) || 0
        banLimit++
        client.banLimit.set(yapan.id, banLimit)
        if (banLimit == 3) {
            client.channels.cache.get(kanal).send(`<@${yapan.id}> | (\`${yapan.id}\`) kişisi <@${hedef.id}> | (\`${hedef.id}\`) kişisini sağ tık yöntemiyle yasakladığı için sunucudan yasaklandı!`)
            let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
            guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
                //client.roleBackup.set(huh.id, huh.permissions.bitfield)
                huh.setPermissions(0)
            })
            await guild.members.ban(yapan.id, {
                reason: "Birden fazla kullanıcıya sağ tık ban işlemi uygulamak"
            }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> ban limiti aştı fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            client.blackList.push(yapan.id)
            client.banLimit.delete(yapan.id)
        }
        setTimeout(() => {
            if (client.banLimit.has(yapan.id)) {
                client.banLimit.delete(yapan.id)
            }
        }, ms("1m"))
    })
})

client.on("guildUpdate", async (oldGuild, newGuild) => {
    await newGuild.fetchAuditLogs({
        type: "GUILD_UPDATE"
    }).then(async (audit) => {
        let ayar = audit.entries.first();
        let hedef = ayar.target;
        let yapan = ayar.executor;
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (yapan.id == client.user.id) return;
        if (client.ownerst.includes(yapan.id)) return;
        if (oldGuild.name !== newGuild.name) {
            newGuild.setName("Cullen #0262")
            newGuild.members.ban(yapan.id, {
                reason: "Sunucu ismi değiştirmek."
            })
            client.blackList.push(yapan.id)
            client.channels.cache.get(kanal).send(`<@${yapan.id}> | (\`${yapan.id}\`) kişisi tarafından sunucu ismi değiştirildi. Kişi banlandı, Sunucu ismi eski haline çevirildi.`)
        }
        if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
            newGuild.members.ban(yapan.id, {
                reason: "Sunucu ÖZEL URL değiştirmek."
            }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> sunucu ismi değiştirdi fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            client.blackList.push(yapan.id)
        }
    })
})

client.on("guildUpdate", async (oldGuild, newGuild) => {
    let url = "262"
    if (newGuild.vanityURLCode == url) return
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
        let wat = await oldGuild.fetchAuditLogs({
            type: "GUILD_UPDATE"
        })
        let yapanpic = oldGuild.members.cache.get(wat.entries.first().executor.id)
        axios({
            method: "patch",
            url: `https://discord.com/api/v6/guilds/${oldGuild.id}/vanity-url`,
            data: {
                code: url
            },
            headers: {
                authorization: `Bot ${client.token}`
            }
        }).then(() => {
            client.channels.cache.get(kanal).send(`🔐 Sunucu Özel URLsi \`${oldGuild.vanityURLCode}\`, ${yapanpic} | (\`${yapanpic.id}\`) kişisi tarafından değiştirildi. Kişi banlandı, URL eski haline çevirildi.`)
            newGuild.members.ban(yapanpic.id).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapanpic.id + "> url değişti fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
        }).catch(e => {
            newGuild.members.ban(yapanpic.id).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapanpic.id + "> url değişti fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            console.error(e)
        })
    }
})

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    await newMember.guild.fetchAuditLogs({
        type: "MEMBER_ROLE_UPDATE"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let hedef = ayar.target
        let yapan = ayar.executor
        if (hedef.id != newMember.id) return
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (client.ownerst.includes(yapan.id)) return
        newMember.roles.cache.forEach(async role => {
            if (!oldMember.roles.cache.has(role.id)) {
                let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "VIEW_AUDIT_LOG", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD"]
                if (arr.some(x => role.permissions.has(x)) == true) {
                    client.channels.cache.get(kanal).send(`📑 <@${yapan.id}> | (\`${yapan.id}\`) kişisi <@${hedef.id}> | (\`${hedef.id}\`) kişisine yetki rolü (\`${role.name}\`) verdiği için yasaklandı!`)
                    await newMember.roles.remove(role)
                    newMember.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && newMember.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
                        //client.backup.set(huh.id, huh.permissions.bitfield)
                        huh.setPermissions(0)
                    })
                    await newMember.guild.members.ban(yapan.id, "Kişilere yetki rolü tanımlama").catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> yetki rolü verdi fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
                    client.blackList.push(yapan.id)
                }
            }
        });
    })
})

client.on("roleUpdate", async (oldRole, newRole) => {
    await newRole.guild.fetchAuditLogs({
        type: "ROLE_UPDATE"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let hedef = ayar.target
        let yapan = ayar.executor
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (yapan.id == client.user.id) return
        if (client.ownerst.includes(yapan.id)) return
        if (oldRole.permissions !== newRole.permissions) {
            let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "VIEW_AUDIT_LOG", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD"]
            if (arr.some(x => newRole.permissions.has(x)) == true) {
                client.channels.cache.get(kanal).send(`📑 <@${yapan.id}> | (\`${yapan.id}\`) kişisi rollere yasaklı izin tanıdığı için yasaklandı!`)
                newRole.setPermissions(0);
            }
            newRole.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && newRole.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
                // client.backup.set(huh.id, huh.permissions.bitfield)
                huh.setPermissions(0)
            })
            await newRole.guild.members.ban(yapan.id, {
                reason: "Rollere gereksiz izin tanımak"
            }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> rollere izin tanıdı fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            client.blackList.push(yapan.id)
        }

    })
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
    await newChannel.guild.fetchAuditLogs({
        type: "CHANNEL_UPDATE"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let hedef = ayar.target
        let yapan = ayar.executor
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (yapan.id == client.user.id) return
        if (client.ownerst.includes(yapan.id)) return
        if (oldChannel.name !== newChannel.name) {
            let limitOfChannel = client.channelName.get(yapan.id) || []
            limitOfChannel.push({
                channel: newChannel.id,
                name: oldChannel.name,
                newName: newChannel.name
            })
            client.channelName.set(yapan.id, limitOfChannel)
            if (limitOfChannel.length == 2) {
                let mapped = limitOfChannel.map(x => `${x.name} -> ${x.newName}`)
                client.channels.cache.get(kanal).send(`<@${yapan.id}> | (\`${yapan.id}\`) kişisi ${limitOfChannel.length} kanalın ismini değiştirdiği için yasaklandı.Değiştirmeye çalıştığı kanal isimleri aşağıda belirtilmiştir.\`\`\`${mapped.join("\n")}\`\`\``)
                newChannel.guild.members.ban(yapan.id, {
                    reason: "Kanal isimlerini değiştirmek."
                }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> kanal ismi değişti fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
                client.blackList.push(yapan.id)
                limitOfChannel.map(async (x) => {
                    await newChannel.guild.channels.cache.get(x.channel).setName(x.name)
                })
                let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
                newChannel.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && newChannel.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
                    //  client.roleBackup.set(huh.id, huh.permissions.bitfield)
                    huh.setPermissions(0)
                })
                client.channelName.delete(yapan.id)
            }
            setTimeout(() => {
                if (client.channelName.has(yapan.id)) {
                    client.channelName.delete(yapan.id)
                }
            }, ms("30s"))
        }

    })
})

client.on("roleUpdate", async (oldRole, newRole) => {
    await newRole.guild.fetchAuditLogs({
        type: "ROLE_UPDATE"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let hedef = ayar.target
        let yapan = ayar.executor
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (yapan.id == client.user.id) return
        if (client.ownerst.includes(yapan.id)) return
        if (oldRole.name !== newRole.name) {
            client.channels.cache.get(kanal).send(`(\`${yapan.id}\`) | <@${yapan.id}> kişisi ${oldRole.name} rolün ismini değiştirdiği için sunucudan yasaklandı.`)
            newRole.guild.members.ban(yapan.id, {
                reason: "Rol isimlerini değiştirmek."
            }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> rol ismi değişti fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            await newRole.setName(oldRole.name)
            client.blackList.push(yapan.id)
            let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
            newRole.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && newRole.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
                //client.roleBackup.set(huh.id, huh.permissions.bitfield)
                huh.setPermissions(0)
            })
        }

    })
});



client.on("channelCreate", async channel => {
    await channel.guild
        .fetchAuditLogs({
            type: "CHANNEL_CREATE"
        })
        .then(async audit => {
            let ayar = audit.entries.first();
            let yapan = ayar.executor;
            if (yapan.tag == client.user.tag) return;
            if (Date.now() - ayar.createdTimestamp > 5000) return;
            if (client.ownerst.includes(yapan.id)) return;
            let limit = client.channelLimit.get(yapan.id) || [];
            limit.push(channel.id);
            client.channelLimit.set(yapan.id, limit);
            if (limit.length == 3) {
                client.channels.cache.get(kanal).send(`<@${yapan.id}> | (\`${yapan.id}\`) kişisi toplam 3 kanal açtığı için sunucudan yasaklandı kanallar siliniyor. Açtığı kanallar \`\`\`${limit.map(x => channel.guild.channels.cache.get(x).name).join("\n")}\`\`\``);
                channel.guild.members.ban(yapan.id, {
                    reason: "3 Kanal açma limitini aşmak."
                }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> kanal açma limitini aştı fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
                client.blackList.push(yapan.id)
                let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
                channel.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && channel.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
                    // client.roleBackup.set(huh.id, huh.permissions.bitfield)
                    huh.setPermissions(0)
                })
                limit.map(async x => {
                    await channel.guild.channels.cache.get(x).delete();
                });
                client.channelLimit.delete(yapan.id);
            }
            setTimeout(() => {
                if (client.channelLimit.has(yapan.id)) {
                    client.channelLimit.delete(yapan.id);
                }
            }, ms("1m"));
        });
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
    newChannel.guild.fetchAuditLogs({
        type: "CHANNEL_OVERWRITE_UPDATE"
    }).then(async audit => {
        let ayar = audit.entries.first();
        let yapan = ayar.executor;
        if (yapan.tag == client.user.tag) return;
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (client.ownerst.includes(yapan.id)) return
        if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
            let everyonePerm = newChannel.permissionOverwrites.filter(p => p.id == newChannel.guild.id).map(x => (x.allow.bitfield));
            let everyonePermission = new Discord.Permissions(everyonePerm[0]).toArray();
            let olDeveryonePerm = oldChannel.permissionOverwrites.filter(p => p.id == newChannel.guild.id).map(x => (x.allow.bitfield));
            let olDeveryonePermission = new Discord.Permissions(olDeveryonePerm[0]).toArray();
            if (olDeveryonePermission.includes("MENTION_EVERYONE") || olDeveryonePermission.includes("MANAGE_CHANNELS")) return;
            if (everyonePermission.includes("MENTION_EVERYONE") || everyonePermission.includes("MANAGE_CHANNELS")) {
                newChannel.guild.members.ban(yapan.id, {
                    reason: "Kanallara gereksiz izin tanımak."
                }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> kanallara izin tanıdı fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
                client.blackList.push(yapan.id)
                client.channels.cache.get(kanal).send(`<@${yapan.id}> | (\`${yapan.id}\`) kişisi ${newChannel.name} kanalının everyone izinlerine gereksiz izin tanıdığı için kullanıcı yasaklandı.`);
                newChannel.permissionOverwrites.map(async (x) => await x.delete().then(x => newChannel.overwritePermissions([{
                    id: newChannel.guild.id,
                    deny: ["VIEW_CHANNEL"]
                }], "Koruma")));
                let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
                newChannel.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && newChannel.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
                    //   client.roleBackup.set(huh.id, huh.permissions.bitfield)
                    huh.setPermissions(0)
                })
            }
        }
    });
});

client.on("guildBanRemove", async (guild, member) => {
    if (!client.blackList.includes(member.id)) return
    await guild.fetchAuditLogs({
        type: "MEMBER_BAN_REMOVE"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let yapan = ayar.executor
        if (client.ownerst.includes(yapan.id)) return
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        client.channels.cache.get(kanal).send(`<@${yapan.id}> | (\`${yapan.id}\`) kişisi daha önceden guard tarafından ban yiyen <@${member.id}> | (\`${member.id}\`) kişisinin yasağını kaldırdığı için banlandı !`)
        await guild.members.ban(yapan.id, {
            reason: "Karalistede bulunan birinin banını açmak"
        }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> yasaklı ban açtı fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
        await guild.members.ban(member.id, {
            reason: "Karalistede olmasına rağmen banı açılmak"
        })
        client.blackList.push(yapan.id)
    })
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
    newChannel.guild.fetchAuditLogs({
        type: "CHANNEL_OVERWRITE_UPDATE"
    }).then(async audit => {
        let ayar = audit.entries.first();
        let yapan = ayar.executor;
        if (yapan.tag == client.user.tag) return;
        if (Date.now() - ayar.createdTimestamp > 4000) return;
        if (client.ownerst.includes(yapan.id)) return
        if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
            newChannel.guild.members.ban(yapan.id, {
                reason: "Kanallara gereksiz izin tanımak."
            }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> kanallara izin tanıdı fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            client.blackList.push(yapan.id)
            client.channels.cache.get(kanal).send(`<@${yapan.id}> kişisi ${newChannel.name} kanalına gereksiz izin tanıdığı için kullanıcı yasaklandı.`);
        }
    });
});


client.on("message", async message => {
    if (message.author.bot) return;
    if (message.author.id !== "282238108739567647") return
    if (message.channel.type !== "text") return;
    if (!message.guild) return;
    let prefikslerim = ["."];
    let tokuchim = false;
    for (const içindeki of prefikslerim) {
        if (message.content.startsWith(içindeki)) tokuchim = içindeki;
    }
    if (!tokuchim) return;
    const args = message.content.slice(tokuchim.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const event = message.content.toLower;
    const split = message.content.split('"');
    switch (command) {
        case "eval":
            if (args.join("").toLowerCase().includes('token')) return message.channel.send("Wow, you're smart.")
            const clean = text => {
                if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else return text;
            }
            try {
                const code = args.join(" ");
                let evaled = await eval(code);
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                message.channel.send(clean(evaled), {
                    code: "xl"
                });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
            break

    }
});

client.on("disconnect", () => console.log("Bot bağlantısı kesildi"))
client.on("reconnecting", () => console.log("Bot tekrar bağlanıyor..."))
client.on("error", e => console.log(e))
client.on("warn", info => console.log(info));

process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik Hata: ", errorMsg);
    process.exit(1);
});

process.on("unhandledRejection", err => {
    console.error("Yakalanamayan Hata: ", err);
});

client.login("")