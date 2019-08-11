const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require('fs');

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    var jsFiles = files.filter( f => f.split(".").pop() === "js");
    if(jsFiles.length <=0 )
        return;

    jsFiles.forEach((f, i)=> {
        var fileGet = require(`./commands/${f}`);
        bot.commands.set(fileGet.help.name,fileGet)
        console.log(`${f} loaded`);
    });

});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);

    bot.user.setActivity("In development by Rémi Vermeersch", {type:"WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot)
        return; 
    if(message.channel.type ==="dm") 
        return;

    var prefix = botConfig.prefix;
    if(message.content.charAt(0)!==prefix)
        return;
    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    var com = bot.commands.get(command.slice(prefix.length));

    if(com) 
        com.run(bot, message, args);
    else
        return message.channel.send("unknown command");



    /*if(command == `${prefix}hallo`){
        return message.channel.send("hallo");
    }

    if( command === `${prefix}info`){


    }*/
});

bot.login(botConfig.token);
