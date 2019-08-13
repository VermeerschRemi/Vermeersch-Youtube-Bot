const discord = require("discord.js");

module.exports.run = async(bot, message,args) =>{
    var sossen = bot.channels.find("name","General");
    var user = message.mentions.users.first();
    if(!user)
        return message.channel.send("please provide a @mention");
    
    var m = message;
    message.guild.member(user).setVoiceChannel(sossen).then(()=>{
        message.channel.send(`<@${message.member.id}> moved <@${message.guild.member(user).id}> to the sossen`);
    }).catch(console.error);
}

module.exports.help = {
    name: 'move'
}