const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minfo')
		.setDescription('Інформація про наявну пісню.'),


	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild)

		if (!queue)
			return interaction.reply('Наразі ніяка пісня не грає.')

		let bar = queue.createProgressBar({
			queue: false,
			length: 19
		})

		const currentSong = queue.current;

		let songList = `Зараз грає [${currentSong.title}](${currentSong.url})\n\n` + bar + '\n\n';

		queue.tracks.map((item, index) => {
			return songList = songList + `${index}. ${item.title} | ${item.duration}\n`
		})

		const embed = new MessageEmbed()
			.setThumbnail(currentSong.thumbnail)
			.setDescription(songList)
			.setTitle('Інформаційна панель музикального бота.')

		interaction.reply({embeds: [embed]})
	},
};
