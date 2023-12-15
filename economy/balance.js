const { connectToDatabase } = require("../db/conn");

module.exports = {
    name: "balance",
    description: "Check Your Balance Account",
    async execute(message, args) {
        try {
            // Debugging: Cetak pesan bahwa command /balance sedang dijalankan
            console.log("Command /balance executed");

            // Melakukan koneksi db
            const connection = await connectToDatabase();

            // Melakukan query untuk mendapatkan data player
            console.log("Before query execution");
            const [rows, fields] = await connection.query(
                "SELECT * FROM players WHERE users_id = ?",
                [message.author.id]
            );
            console.log("After query execution");

            // Jika player belum ada, beri pesan bahwa player belum memulai petualangan
            if (rows.length === 0) {
                await message.reply(`Kamu Belum Memulai Petualangan, ${message.author.username}.`);
            } else {
                // Jika player sudah ada, tampilkan balance
                const playerBalance = rows[0].balance;
                await message.reply(`Your Balance: ${playerBalance} QC!`);
            }

            // Pastikan untuk menutup koneksi setelah digunakan
            connection.end();
        } catch (error) {
            console.error("Error in balance command:", error);
        }
    }
};
