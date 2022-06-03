const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mstop')
		.setDescription('Виключити музику.'),


	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild)

		if (!queue)
			return interaction.reply('Наразі ніяка пісня не грає.')

		interaction.reply('Бота зупинено.')
		queue.stop()
	},
};
