const  { SlashCommandBuilder } = require("discord.js");
const { fetchPrice } = require("../../script");
const data = new SlashCommandBuilder()
  .setName("get_price")
  .setDescription("Get Current Cheapest Price");

const execute = async (interaction)=>{
    await interaction.deferReply();
    const {mssg,price} = await fetchPrice();
    await interaction.editReply(`${mssg}\n Price: ${price}`)
}

module.exports = {
    data,execute
};