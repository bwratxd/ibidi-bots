module.exports = (fs, client) => {
    fs.readdir("./LoadingCommands/", (err, files) => {
      console.log("Komutlar Yükleniyor.");
      if (err) return console.log("Error var error " + err);
      files.filter(f => f.endsWith(".js")).forEach(file => {
        let prop = require(`../LoadingCommands/${file}`);
        client.commands.set(prop.help.name, prop);
        prop.help.alias.forEach(alias => { 
          client.aliases.set(alias, prop.help.name);
        });
      });
      console.log(`Toplam ( ${files.length} ) adet komut bulunuyor.`);
      console.log("--------------------------");
    });
  };