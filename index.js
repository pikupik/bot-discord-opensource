const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    ] 
})
const { connectToDatabase } = require('./db/db_connection');

dotenv.config();
const token = process.env.DISCORD_TOKEN;

//prefix
const PREFIX = '/';

// Load commands
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

// Load commands from the "economy" folder
loadCommands('./economy', client);
// Load commands from the "combat" folder
loadCommands('./combat', client);

//comannds awal player memulai petualangan
client.on('messageCreate', async (message) => {
  try {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'start') {
      const connection = await connectToDatabase();
      
      // ... (kode lainnya)

      await connection.execute('INSERT INTO players (user_id, balance, inventory, health, exp, level) VALUES (?, ?, CAST(? AS JSON), ?, ?, ?)',
        [message.author.id, 1000000, '[]', 100, 0, 1]);
      
      // ... (kode lainnya)

      connection.end();
    }

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    command.execute(message, args);

  } catch (error) {
    console.error('Error in messageCreate event:', error);
  }
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', (error) => {
  console.error('Unhandled error:', error);
});

client.login(token);
