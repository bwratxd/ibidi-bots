const {Client, MessageEmbed } = require("discord.js")
const client = new Client({ disableEveryone: true});
const config = require('./config.json');
const fs = require('fs');

client.login(config.token).then(console.log("Bot başarıyla giriş yaptı."))
client.on("ready", async () => {
  client.user.setPresence({ activity: { name: `ibidi.` }, status: "idle" });
  let botVoiceChannel = client.channels.cache.get(config.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});

client.on("message", message => {
    if (message.author.bot || !message.guild) return;
    if (message.author.id !== config.OwnerID && message.author.id !== message.guild.owner.id) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
  let args = message.content.split(' ').slice(1);
  let komut = message.content.split(' ')[0].slice(config.prefix.length);
  let embed = new MessageEmbed().setColor("RANDOM").setFooter(`ibidi.`);


  if (komut === "eval" && message.author.id === config.OwnerID) {
    if (!args[0]) return
      let code = args.join(' ');
      function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
      message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
  };

if(komut === "güvenli" || komut === "whitelist") {
  let hedef;
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" "));
  let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if (rol) hedef = rol;
  if (uye) hedef = uye;
  let guvenliler = config.whitelist || [];
  if (!hedef) return message.channel.send(embed.setDescription(`Güvenli listeye eklemek veya kaldırmak için bir hedef (rol/üye) belirtmelisin`).addField("Güvenli Liste", guvenliler.length > 0 ? guvenliler.map(g => (message.guild.roles.cache.has(g.slice(0)) || message.guild.members.cache.has(g.slice(0))) ? (message.guild.roles.cache.get(g.slice(0)) || message.guild.members.cache.get(g.slice(0))) : g).join('\n') : "Bulunamadı!"));
  if (guvenliler.some(g => g.includes(hedef.id))) {
    guvenliler = guvenliler.filter(g => !g.includes(hedef.id));
    config.whitelist = guvenliler;
    fs.writeFile("./config.json", JSON.stringify(config), (err) => {
      if (err) console.log(err);
    });
    message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeden kaldırıldı!`));
  } else {
    config.whitelist.push(`${hedef.id}`);
    fs.writeFile("./config.json", JSON.stringify(config), (err) => {
      if (err) console.log(err);
    });
    message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeye eklendi!`));
  };
};
});

function guvenli(kisiID) {
  let uye = client.guilds.cache.get(config.guildID).members.cache.get(kisiID);
  let guvenliler = config.whitelist || [];
  if (!uye || uye.id === client.user.id || uye.id === config.OwnerID || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(0) || uye.roles.cache.has(g.slice(0)))) return true
  else return false;
};

    client.on("message", async message => {
      if (message.author.bot || !message.guild) return;
      if (message.member.hasPermission('ADMINISTRATOR') || guvenli(message.member.id)) return;
     
          const reklamfiltre = ["discord.gg","discord.com/invite","discordapp.com/invite","https://"]
             if (reklamfiltre.some(word => message.content.includes(word))) {
              if(message.deletable) message.delete({timeout: 0010}).catch(console.error); return message.reply('Reklam yapman yasak lütfen reklam yapmamaya dikkat et !').then(a => a.delete({timeout: 5000}))}
             })

     client.on("messageUpdate", async(oldMessage, newMessage) => {      
      if (newMessage.author.bot || !newMessage.guild) return;
     if (newMessage.member.hasPermission('ADMINISTRATOR') || guvenli(newMessage.member.id)) return;
      
             const reklamfiltre = ["discord.gg","discord.comm/invite","discordapp.com/invite","https://"]
             if (reklamfiltre.some(word => newMessage.content.includes(word))) {
               if(newMessage.deletable) newMessage.delete({timeout: 0010}).catch(console.error); return newMessage.reply('Reklam yapman yasak lütfen reklam yapmamaya dikkat et !').then(a => a.delete({timeout: 5000}))}
             })
const ibidikufur = ["allahoc","allahoç","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","oc","abaza","abazan","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","ass","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","cenabet","cibiliyetsiz","cibilliyetini","cibilliyetsiz","cif","cikar","cim","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","godumun","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f","yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zibidi","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
      
client.on("message", async message => {
  if (message.author.bot || !message.guild) return;
  if (message.member.hasPermission('ADMINISTRATOR') || guvenli(message.member.id)) return;
  
       if (ibidikufur.some(ibidi => ` ${message.content.toLowerCase()} `.includes(` ${ibidi} `))) { 

        if(message.deletable) message.delete({timeout: 0020}).catch(console.error); return message.reply('Küfür etmen yasak lütfen küfür içerikli mesaj atmamaya dikkat et.').then(a => a.delete({timeout: 5000}))}
      })

client.on("messageUpdate", async(oldMessage, newMessage) => { 
 if (newMessage.author.bot || !newMessage.guild) return;
if (newMessage.member.hasPermission('ADMINISTRATOR') || guvenli(newMessage.member.id)) return;
  
      if (ibidikufur.some(ibidi => ` ${newMessage.content.toLowerCase()} `.includes(` ${ibidi} `))) {
        if(newMessage.deletable) newMessage.delete({timeout: 0020}).catch(console.error); return newMessage.reply('Küfür etmen yasak lütfen küfür içerikli mesaj atmamaya dikkat et.').then(a => a.delete({timeout: 5000}))}
    })


        

client.on("message", async message => {
  if (message.author.bot || !message.guild) return;
if(message.member.roles.cache.get(config.mutedRole)) return;
   if (message.member.hasPermission('ADMINISTRATOR') || guvenli(message.member.id)) return;
  
    if (message.mentions.users.size >= 10) { 
        const mutedRole = message.guild.roles.cache.get(config.mutedRole)
         message.member.roles.add(mutedRole);
         message.channel.send("Birden çok kişiyi etiketlediğin için 5 dakika boyunca susturuldun.");
    setTimeout(() => {
      message.member.roles.remove(mutedRole);
    }, 300000);
      if(message.deletable) message.delete({timeout: 0030}).catch(console.error);
    }
  });

client.on("messageUpdate", async(oldMessage, newMessage) => { 
  if (newMessage.author.bot || !newMessage.guild) return;
  if (newMessage.member.hasPermission('ADMINISTRATOR') || guvenli(newMessage.member.id)) return;
  if(newMessage.member.roles.cache.get(config.mutedRole)) return;
  
    if (newMessage.mentions.users.size >= 10) { 
      const mutedRole = message.guild.roles.cache.get(config.mutedRole)
      newMessage.member.roles.add(mutedRole);
      newMessage.channel.send("Birden çok kişiyi etiketlediğin için 5 dakika boyunca susturuldun.");
 setTimeout(() => {
  newMessage.member.roles.remove(mutedRole);
 }, 300000);
      if(newMessage.deletable) newMessage.delete({timeout: 0030}).catch(console.error);
      newMessage.channel.send(`Lütfen insanları etiketleme.`);
    }
  });


  client.on("message", async message => {
    if(message.author.bot || !message.guild) return;
    if(message.member.hasPermission('ADMINISTRATOR') || guvenli(message.member.id)) return;
    
    if(message.content.length > 15) {
    let caps = message.content.toUpperCase()
    if(message.content == caps) {
      const a = /(1|2|3|4|5|6|7|8|9|0)/
      if(message.content.match(a)) return;
    if(!message.mentions.users.first())
    if(!message.mentions.channels.first()) {
      if(message.deletable) message.delete({timeout: 0040}).catch(console.error);
    return message.channel.send(`${message.author}, Lütfen daha çok küçük harf kullanmaya özen göster.`).then(a => a.delete({timeout: 5000}))
    }
    else if (capskoruma == 'kapali') {
     }}}});

   client.on("messageUpdate", async(oldMessage, newMessage) => { 
      if(newMessage.author.bot || !newMessage.guild) return;
      if(newMessage.member.hasPermission('ADMINISTRATOR') || guvenli(newMessage.member.id)) return;
      
      if(newMessage.content.length > 15) {
      let caps = newMessage.content.toUpperCase()
      if(newMessage.content == caps) {
        const a = /(1|2|3|4|5|6|7|8|9|0)/
      if(newMessage.content.match(a)) return;
      if(!newMessage.mentions.users.first()) 
      if(!newMessage.mentions.channels.first()) {
        if(newMessage.deletable) newMessage.delete({timeout: 0040}).catch(console.error);
      return newMessage.channel.send(`${newMessage.author}, Lütfen daha çok küçük harf kullanmaya özen göster.`).then(a => a.delete({timeout: 5000}))
      }
       }}});



const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000;
const DIFF = 2000;

client.on('message', async message => {
 if(message.author.bot || !message.guild) return;
 if(message.member.hasPermission('ADMINISTRATOR') || guvenli(message.member.id)) return;
 if(message.member.roles.cache.get(config.mutedRole)) return;

 if(usersMap.has(message.author.id)) {
const userData = usersMap.get(message.author.id);
const {lastMessage, timer} = userData;
const difference = message.createdTimestamp - lastMessage.createdTimestamp;
let msgCount = userData.msgCount;

if(difference > DIFF) {
clearTimeout(timer);
userData.msgCount = 1;
userData.lastMessage = message;
userData.timer = setTimeout(() => {
  usersMap.delete(message.author.id);
}, TIME);
usersMap.set(message.author.id, userData)
}
else{
msgCount++;
if(parseInt(msgCount) === LIMIT) {
    const mutedRole = message.guild.roles.cache.get(config.mutedRole)
     message.member.roles.add(mutedRole);
     if(message.member.roles.cache.get(config.mutedRole)) return;
     message.channel.send("Spam yaptığından dolayı 5 dakika boyunca susturuldun.").then(a => a.delete({timeout: 5000}))

setTimeout(() => {
  if(!message.member.roles.cache.get(config.mutedRole)) return;
  message.member.roles.remove(mutedRole);
}, 300000);
    }else {
  userData.msgCount = msgCount;
  usersMap.set(message.author.id, userData)
}}}
 else{
let fn = setTimeout(() => {
  usersMap.delete(message.author.id)
}, TIME);
usersMap.set(message.author.id, {
msgCount: 1,
lastMessage: message,
timer: fn
})}});


client.on('message', async message => {
  if(message.author.bot || !message.guild) return;
  if(message.member.hasPermission('ADMINISTRATOR') || guvenli(message.member.id)) return;
   
  if(message.content.length > "500") {
    if(message.deletable)  message.delete({timeout: 0050}).catch(console.error) 
    return message.channel.send(`Lütfen mesajınızı 500 karakterden az yazınız`).then(a => a.delete({timeout: 5000}))
  }
  });

  client.on("messageUpdate", async(oldMessage, newMessage) => { 
      if(newMessage.author.bot || !newMessage.guild) return;
      if(newMessage.member.hasPermission('ADMINISTRATOR') || guvenli(newMessage.member.id)) return;
        
      if(newMessage.content.length > "500") {
        if(newMessage.deletable)  newMessage.delete({timeout: 0050}).catch(console.error); 
        return newMessage.channel.send(`Lütfen mesajınızı 500 karakterden az yazınız`).then(a => a.delete({timeout: 5000}))
      }
      });




     
