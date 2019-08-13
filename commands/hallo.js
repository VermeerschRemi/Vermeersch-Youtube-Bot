const discord = require("discord.js");

module.exports.run = async(bot, message,args) =>{
    return message.channel.send(`${message.member.displayName} i know everything about you hehehe`);
}

module.exports.help = {
    name: 'hallo'
}