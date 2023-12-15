module.exports = {
    name: "info",
    description: "Get information (Combat, Economy, or Cmd)",
    execute(message, args) {
        try {
            // Debugging: Cetak pesan bahwa command /info sedang dijalankan
            console.log("Command /info executed");

            // Pastikan ada argumen yang diberikan
            if (args.length === 0) {
                return message.reply("Usage: /info <combat/economy/cmd>");
            }

            const infoType = args[0].toLowerCase(); // Ambil argumen pertama (lowercased)

            // Tampilkan informasi berdasarkan jenis info
            if (infoType === "combat") {
                // Tampilkan informasi combat
                return message.reply(`
                Combat Info: ...\n\n
                /hunt = Hunting, you can get a random item from monsters!\n
                `);
            } else if (infoType === "economy") {
                // Tampilkan informasi economy
                return message.reply(`
                    Economy Info: ...\n\n
                    /balance = Check Your Balance\n
                    /deposit (amount QC) = to deposit into bank QC, safe your money (cuz if your health = 0, all money is 0 to!)\n
                    /withdraw (amount QC) = to withdraw your money from bank account\n
                    /bank = check your balance in bank account\n
                    /sendqc (tag user) (ammount) = send your QC Cash to user\n
                    /senditem (tag user) (itemname) = send your Item to user\n
                    /inventory = check your inventory\n
                    
                    `);
            } else if (infoType === "cmd") {
                // Tampilkan informasi cmd
                return message.reply(`
                    Cmd Info: ...\n\n
                    /start = Start Your Journey!\n
                    /info = all about commands info
                    `);
            } else {
                // Jika jenis info tidak valid
                return message.reply("Usage: /info <combat/economy/cmd>");
            }
        } catch (error) {
            console.error("Error in info command:", error);
        }
    }
};
