module.exports = (fs, client) => {
    fs.readdir("./LoadingEvents/", (err, files, events = []) => {
      if (err) return console.log(err);
      console.log("--------------------------");
      console.log("Eventler yükleniyor.");
      files.filter(f => f.endsWith(".js")).forEach(file => {
        let prop = require(`../LoadingEvents/${file}`);
        client.on(prop.event.name, prop.event.eventOn);
        events.push(prop.event.name);
      });
      console.log("[" + events.join(", ") + "] " +  " isimli event(ler) yüklendi.");
      console.log("--------------------------");
    });
  };