const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mskip')
		.setDescription('Пропустити наявний трек.'),


	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild)

		if (!queue)
			return interaction.reply('Наразі ніяка пісня не грає.')

		const currentSong = queue.current;

		queue.skip()
		interaction.reply({embeds: [
			new MessageEmbed()
				.setDescription(`${currentSong.title} пропущено.`)
				.setThumbnail(currentSong.thumbnail)
			]})
	},
};
