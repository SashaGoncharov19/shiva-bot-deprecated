/**
 * @file Dynamic help command
 * @author Naman Vrati
 * @since 1.0.0
 */

// Deconstructing prefix from config file to use in help command
const { prefix } = require("./../../config.json");

// Deconstructing MessageEmbed to create embeds within this command
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	description: "List all commands of bot or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,

	/**
	 * @description Executes when the command is called by command handler.
	 * @author Naman Vrati
	 * @param {import("discord.js").Message} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */

	execute(message, args) {
		const { commands } = message.client;

		// If there are no args, it means it needs whole help command.

		if (!args.length) {
			/**
			 * @type {import("discord.js").MessageEmbed}
			 * @description Help command embed object
			 */

			let helpEmbed = new MessageEmbed()
				.setColor(0x4286f4)
				.setURL(process.env.URL)
				.setTitle("Лист всіх комманд.")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addField(
					"Використовування",
					`\nВи можете відправити \`${prefix}help [назву команди]\` щоб отримати інформацію про неї!`
				);

			// Attempts to send embed in DMs.

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === "dm") return;

					// On validation, reply back.

					message.reply({
						content: "Я відправив тобі список усіх команд в особисті повідомлення.",
					});
				})
				.catch((error) => {
					// On failing, throw error.

					console.error(
						`Не можу відправити допомогу в особисті повідомлення ${message.author.tag}.\n`,
						error
					);

					message.reply({ content: "Здається я не можу відправити тобі особисті повідомлення." });
				});
		}

		// If argument is provided, check if it's a command.

		/**
		 * @type {String}
		 * @description First argument in lower case
		 */

		const name = args[0].toLowerCase();

		/**
		 * @type {Object}
		 * @description The command object
		 */

		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		// If it's an invalid command.

		if (!command) {
			return message.reply({ content: "Такої команди не існує.." });
		}

		/**
		 * @type {import("discord.js").MessageEmbed}
		 * @description Embed of Help command for a specific command.
		 */

		let commandEmbed = new MessageEmbed()
			.setColor(0x4286f4)
			.setTitle("Помічник");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed
				.addField("Псевдоніми", `\`${command.aliases.join(", ")}\``, true)
				.addField("Затримка", `${command.cooldown || 3} секунд(и)`, true);
		if (command.usage)
			commandEmbed.addField(
				"Використовування",
				`\`${prefix}${command.name} ${command.usage}\``,
				true
			);

		// Finally send the embed.

		message.channel.send({ embeds: [commandEmbed] });
	},
};
