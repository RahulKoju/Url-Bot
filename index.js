const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();
const urlRouter = require("./routes/url");
const { connectTomongoDB } = require("./connection");
const { handleGenerateNewShortUrl } = require("./controller/url");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

connectTomongoDB("mongodb://127.0.0.1:27017/discordurl").then(() => {
  console.log("mongoDB connected");
});
app.use("/", urlRouter);
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const res = await handleGenerateNewShortUrl(message);
    message.reply({
      content: res.shortenedurl,
    });
  } else {
    message.reply({
      content: "hi from bot",
    });
  }
});
client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("pong!!");
});
client.login(
  "MTI1MTE3MzI5MTE3NjA5OTg0MA.GrOiqS.jHqS8C4uRoVYOUcz5iaBdhYyuI8UT341deR3TA"
);
app.listen(8001, () => {
  console.log("server started at port:8001");
});
