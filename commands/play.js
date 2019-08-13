const ytdl = require('ytdl-core');

module.exports.run = async(bot, message, args) =>{
    if(!message.member.voiceChannel)
        return message.channel.send("connect to a voice channel!");
    if(message.guild.me.voiceChannel)
        return message.channel.send("I'm already in another voice channel!");
    if(!args[0])
        return message.channel.send("please provide a url");
    if(!await ytdl.validateURL(args[0]))
        return message.channel.send("provide a valid url mutn");
    
    var info = await ytdl.getInfo(args[0]);

    var options = { seek:0 , volume:1};

    var voiceConnection = message.member.voiceChannel.join()
    .then((voiceChannel) =>{
        var stream = ytdl(args[0], {filter: "audioonly"});
        var streamDispatch = voiceChannel.playStream(stream, options);
    })
    .catch(console.error);
    message.channel.send(`now playing ${info.title}`);
}

module.exports.help = {
    name: "play"
}