//memanggil module dari db/conn.js
const { connectToDatabase } = require("../db/conn");

//selalu ingat cara ngoding seperti ini, module.exports
module.exports = {
    name: "start",
    description: "Start the journey command",
    async execute(message, args) {
        try {
            //selalu debbuging apakah benar commands sudah di jalankan?
            console.log("Command /start executed");

            //melakukan koneksi db
            const connection = await connectToDatabase();
            console.log("Before query execution");
            const [rows, fields] = await connection.query(
                "SELECT * FROM players WHERE users_id = ?",
                [message.author.id]
            );
            console.log("After query execution");

            //jika Player belum ada, maka buatkan player
            if (rows.length === 0) {
                await connection.query(
                    "INSERT INTO players (users_id, balance, inventory, health, exp, level) VALUES (?, ?, ?, ?, ?, ?)",
                    [message.author.id, 1000000, "[]", 100, 0, 1]
                );

                // pesan yg akan muncul di discord
                await message.reply(
                    `Bank account created for ${message.author.username}. You have received a gift from buddum of 100000 QC (Quantum Cash) in your Bank Account. Next, buy some sword for hunting!`
                );
            } else {
                //Jika Sudah melakukan /start
                await message.reply(
                    `You already have a journey, ${message.author.username}.`
                );
            }

            // Pastikan untuk menutup koneksi setelah digunakan
            connection.end();
            //menangkap error
        } catch (error) {
            console.error("Error in start command:", error);
        }
    }
};
