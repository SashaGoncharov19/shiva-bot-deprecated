const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mrepeat')
		.setDescription('Включити повторення.')
		.addStringOption((string) =>
			string.setName('status')
				.setDescription('Виберіть пункт повторювання.')
				.setRequired(true)
				.addChoices(
					{ name: 'Повторювати весь плейлист', value: '2' },
					{ name: 'Повторювати цю музику', value: '1' },
					{ name: 'Виключити', value: '0' }
				)),


	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild);

		const status = interaction.options.getString('status');

		if (!queue) return interaction.reply('Наразі ніяка пісня не грає.')

		if (status === '0') {
			queue.setRepeatMode(QueueRepeatMode.OFF)
		} else if (status === '1') {
			queue.setRepeatMode(QueueRepeatMode.TRACK)
		} else if (status === '2') {
			queue.setRepeatMode(QueueRepeatMode.QUEUE)
		}

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Статус повторювання змінено!')
			.setTimestamp()
			.setFooter({ text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.avatarURL() });

		interaction.reply({embeds: [embed]});
	},
};
