const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mplay')
		.setDescription('Включити музику.')
		.addStringOption((option) =>
			option.setName('url')
				.setDescription('Введіть URL або назву')
				.setRequired(true)),


	async execute(interaction, client) {
		const options = interaction.options;

		const url = options.getString('url')

		if (!interaction.member.voice.channel)
			return interaction.reply('Приєднайся до голосового чату!')

		const result = await client.player.search(url, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO
		})

		const queue = client.player.createQueue(interaction.guild);
		if (!queue.connection)
			await queue.connect(interaction.member.voice.channel)

		const isPlayList = !!result.playlist;

		isPlayList ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
		const songList = isPlayList ? result.playlist : result.tracks[0]

			const msgEmbed = isPlayList ? `**${result.tracks.length} пісень | [${songList.title}](${songList.url})** плейлист добавлений в чергу.`
				: `**[${songList.title}](${songList.url})** добавлено в чергу.`

			const embed = new MessageEmbed()
				.setDescription(msgEmbed)
				.setThumbnail(songList.thumbnail)

			interaction.reply({ embeds: [embed] })

		if (!queue.playing) await queue.play()
	},
};
