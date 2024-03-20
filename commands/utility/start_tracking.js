const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { airportCodes } = require("../../AirportCode");
const fs = require("fs");
const path = require("path");
const { writeUrl } = require("../../writeurl");
const { fetchPrice } = require("../../script");
const data = new SlashCommandBuilder()
  .setName("start_tracking")
  .setDescription("Enter departure and arrival cities along with the date.")
  .addStringOption((option) =>
    option
      .setName("from")
      .setDescription("Departure")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("to")
      .setDescription("Arrival")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("date-yymmdd")
      .setDescription("eg. 240331 ")
      .setRequired(true)
  );

const autocomplete = async (interaction) => {
  const focusedValue = interaction.options.getFocused();
  const filteredValue = airportCodes.filter((airport) =>
    airport.city.startsWith(focusedValue.toLowerCase())
  );
  await interaction.respond(
    filteredValue.map((choice) => ({ name: choice.city, value: choice.code }))
  );
};
const execute = async (interaction) => {
  const from = interaction.options.getString("from");
  const to = interaction.options.getString("to");
  const date = interaction.options.getInteger("date-yymmdd");

  await interaction.deferReply();

  const url = `https://www.skyscanner.co.in/transport/flights/${from}/${to}/${date}/?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=0`;
  writeUrl(url);
  const { mssg, price, bestPrice } = await fetchPrice();
  const book = new ButtonBuilder()
    .setLabel("Book Flight")
    .setURL(url)
    .setStyle(ButtonStyle.Link);
  const row = new ActionRowBuilder().addComponents(book);
  await interaction.editReply({
    content: `Tracking set for flights from ${from} to ${to} on ${date}\nSkyScannerBot scans the prices every 4 mins and will alert you if the price drops the current lowest price.\nCurrent Lowest Price : ₹ ${price}\nCurrent Best Price : ${bestPrice}\nFollow below link to book at the current price.`,
    components: [row],
  });
};

module.exports = { data, execute, autocomplete };
