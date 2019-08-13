/*
 * Author: Rémi Vermeersch
 *
 *how to debug
 *
 *
 *=> npm run debug
 *-In Debug view, select the Node: Nodemon configuration and press play or F5
 *-Choose the process started above
 *
 *
 */

//setup discord api
const discord = require("discord.js");
var kickStijn = true;
//file server setup
const fs = require("fs");

//bot setup
const botConfig = require("./botconfig.json");
const bot = new discord.Client();
bot.commands = new discord.Collection();

//ID'S

var steenId = "375685267446824972";
var KingID =  "323899208627126272";
var trashChannel = "Sossen";
var botChannel = "bot-kanaal";
var kickChannel = "JTF Hub"

/*
 * load all commands
 * to add a command: add js file to commands folder and add name (and description) property =>
 * module.exports.help = {
 *    name: 'name',
 *    description: 'descr' ---
 * }
 */
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) return;

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        bot.commands.set(fileGet.help.name, fileGet);
        console.log(`${f} loaded`);
    });
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);

    bot.user.setActivity("hot stuff in vr", {
        type: "WATCHING"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;
    if (message.content.charAt(0) !== prefix) return;
    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    if(command === "!ohNo"){
        message.channel.send(`oh no it's <@${steenId}>! Let me help you with that!`);
        kickStijn = true;

        var sossen = bot.channels.find(c => c.name === trashChannel);
        bot.fetchUser(steenId).then(steen => {
            message.guild
                .member(steen)
                .setVoiceChannel(sossen)
                .then(() => {
                    bot.channels.find(c => c.name === botChannel).send( `helped you out by moving <@${steenId}> to the sossen!`);
                })
                .catch(console.error);
            }
        );

        return;
    }

    if(command === "!stopKicking" && message.author.id === KingID){
        message.channel.send("fine! fine!")
        kickStijn = false;
        return;
    }

    var com = bot.commands.get(command.slice(prefix.length));

    if (com) var callBack = com.run(bot, message, args);
    else return message.channel.send("unknown command");
});

bot.on("voiceStateUpdate", async (oldMember, newMember) => {
    var sossen = bot.channels.find(c => c.name === trashChannel);

    bot.fetchUser(steenId).then(steen => {
        if (kickStijn) {
            if (
                newMember.voiceChannel.name === kickChannel &&
                newMember.id === steen.id
            ) {
                newMember.guild
                    .member(steen)
                    .setVoiceChannel(sossen)
                    .then(() => {
                        bot.channels.find(c => c.name === botChannel).send( `helped you out by moving <@${steenId}> to the sossen!`);
                    })
                    .catch(console.error);
            }
        }
    });
});

//login bot
bot.login(botConfig.token);
