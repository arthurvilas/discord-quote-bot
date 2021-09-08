require('dotenv').config();
const keepAlive = require('./server');
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


let localFile;
function getQuote(localFile) {
  const quoteNum = Math.floor(Math.random() * localFile.length);
  return localFile[quoteNum].trim();
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}...`);
});

client.on("message", (msg) => {
  if (msg.author.bot) { // If bot is the author, ignore
    return;
  }

  if (/<!COMMANDFORFILE1>/i.test(msg.content)) {
    localFile = fs.readFileSync('.file1.txt', 'utf-8').split(/\r?\n/);
    msg.channel.send(`*"${getQuote(localFile)}"*`);

  } else if (/<!COMMANDFORFILE2>/i.test(msg.content)) {
    localFile = fs.readFileSync('.file2.txt', 'utf-8').split(/\r?\n/);
    msg.channel.send(`*"${getQuote(localFile)}"*`);
  }
});

keepAlive();
client.login(process.env['TOKEN']);