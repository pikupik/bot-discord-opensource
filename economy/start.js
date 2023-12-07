const { connectToDatabase } = require('../db/db_connection');

module.exports = {
    name: 'start',
    description: 'Start the journey command',
    async execute(message, args) {
        try {
            const connection = await connectToDatabase();

            const [rows] = await connection.execute('SELECT * FROM players WHERE user_id = ?', [message.author.id]);

            if (rows.length === 0) {
                // Jika player belum ada, insert ke database
                await connection.execute('INSERT INTO players (user_id, balance, inventory, health, exp, level) VALUES (?, ?, CAST(? AS JSON), ?, ?, ?)',
                    [message.author.id, 1000000, '[]', 100, 0, 1]);

                await message.reply(`Bank account created for ${message.author.username}. You have received a gift from buddum of 100000 QC (Quantum Cash) in your Bank Account. Next, buy some sword for hunting!`);
            } else {
                await message.reply(`You already have a journey, ${message.author.username}.`);
            }

            connection.end();

        } catch (error) {
            console.error('Error in start command:', error);
        }
    },
};
