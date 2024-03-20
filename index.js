const {
  Client,
  Events,
  Collection,
  GatewayIntentBits,
  REST,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { channel } = require("diagnostics_channel");
const { fetchPrice } = require("./script");
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const folderPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(folderPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(folderPath, folder);
  const commandFiles = fs.readdirSync(commandsPath);
  for (const file of commandFiles) {
    const commandFilePath = path.join(commandsPath, file);
    const command = require(commandFilePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  }
});

client.on("ready", async () => {
  const channel = client.channels.cache.get("1095784326865633374");
  setInterval(async () => {
    if (channel) {
      const url = fs.readFileSync("./url.txt", "utf-8");
      const book = new ButtonBuilder()
        .setLabel("Book Flight")
        .setURL(url)
        .setStyle(ButtonStyle.Link);
      const row = new ActionRowBuilder().addComponents(book);
      const { mssg, price, flag, bestPrice } = await fetchPrice();
      if (flag) {
        channel.send({
          content: `Current Lowest Price : ${price}\nCurrent Best Price : ${bestPrice}\nFollow below link to book at the current price.`,
          components: [row],
        });
      }
    }
  }, 480000);
});
client.login(process.env.DISCORD_TOKEN);
