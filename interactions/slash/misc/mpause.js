const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mpause')
		.setDescription('Зупинити музику.')
		.addStringOption((string) =>
			string.setName('status')
			.setDescription('Пауза/Плей для музики.')
			.setRequired(true)
			.addChoices(
				{ name: 'Зупинити', value: 'pause' },
				{ name: 'Запустити', value: 'play' },
			)),


	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild);
		const status = interaction.options.getString('status');

		if (!queue) return interaction.reply('Наразі ніяка пісня не грає.')

		queue.setPaused(status === 'pause')
		interaction.reply(status === 'pause' ? '⏸' : '▶')
	},
};
