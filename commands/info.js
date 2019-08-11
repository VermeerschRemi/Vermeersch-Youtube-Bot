

const discord = require("discord.js");

module.exports.run = async(bot, message,args) =>{
    var botEmbedded = new discord.RichEmbed()
        .setDescription("discord bot info")
        .setColor("#00d9ce")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("bot name: ", bot.user.username)
        .addField("bot created at: ", bot.user.createdAt)
        .addField("bot created by: ", "Rémi Vermeersch")
        console.log(botEmbedded);
    return message.channel.send(botEmbedded);
}

module.exports.help = {
    name: 'info'
}