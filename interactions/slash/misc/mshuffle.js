const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mshuffle')
		.setDescription('Перемішати чергу.'),


	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild)

		if (!queue)
			return interaction.reply('Наразі ніяка пісня не грає.')

		queue.shuffle()
		interaction.reply(`🎶 | Черга з ${queue.tracks.length} пісень перемішана!`)
	},
};
