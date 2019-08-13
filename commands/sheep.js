const discord = require("discord.js");

module.exports.run = async(bot, message,args) =>{
  const connection = await message.member.voiceChannel.join();
  const receiver = connection.createReceiver();

  playFile(connection, './data/Sheep sound.mp3');
}

async function playFile(connection, filePath) {
  return new Promise((resolve, reject) => {
    const dispatcher = connection.playFile(filePath);
    dispatcher.setVolume(1);
    dispatcher.on('start', () => {
      console.log('Playing');
    });
    dispatcher.on('end', () => {
      resolve();
    });
    dispatcher.on('error', (error) => {
      console.error(error);
      reject(error);
    });
  });
}

module.exports.help = {
    name: 'meeh'
}