const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const mysql = require('mysql');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    ]
})


//memanggil dotenv module
dotenv.config();

//membuat token yang diambil dari .env
const token = process.env.DISCORD_TOKEN;

//prefix yg digunakan
const PREFIX = '/';

// Meload Commands (map)
client.commands = new Map();

const loadCommands = (folderPath, client) => {
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`${folderPath}/${file}`);
    if (command.name) {
      client.commands.set(command.name, command);
    } else {
      console.error(`Error loading command from file ${file}: Missing name property.`);
    }
  }
};

// Memanggil seluruh commands yang berada di folder economy
loadCommands('./economy', client);
// memanggil seluruh commands yang berada di foldet combat
loadCommands('./combat', client);
//memanggil seluruh commands yang berada di folder info
loadCommands('./info', client);
//memanggil seluruh commands yg berada di folder cmd
loadCommands('./cmd', client);

//membuat function message agar terhubung tiap tiap folder
client.on('messageCreate', async (message) => {
    try {
        if (!message.content.startsWith(PREFIX) || message.author.bot) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        command.execute(message, args);

    } catch (error) {
        console.error('Error in messageCreate event:', error);
    }
});


//apakah client bot sudah siap?
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Jika ada error di client bot maka ini tampil
client.on('error', (error) => {
  console.error('Unhandled error:', error);
});

//menjalankan bot
client.login(token);
