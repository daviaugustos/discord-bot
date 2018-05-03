const Discord = require('discord.js');
const btcValue = require('btc-value');
const token = require("./token");

var bot = new Discord.Client();

bot.on("ready", function () {
    console.log("Bot is listening...");
});

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;
    if (message.content == "!btc") {
        btcValue().then(value => {
            btcValue.getPercentageChangeLastDay().then(percentage => {
                var perc = percentage
                if (perc > 0) {
                    message.channel.send("Bitcoin price is " + value + " $ \nIncreased(one day ago): " + perc + "% :hugging:");
                } else if (perc < 0) {
                    message.channel.send("Bitcoin price is " + value + " $ \nDecreased (one day ago): " + perc + "% :sob:");
                } else {
                    message.channel.send("Bitcoin price is " + value + " $ \nRemained (one day ago): " + perc + "% :rolling_eyes:");
                }
            });
        });
    }
});

bot.login(token);