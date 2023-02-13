import { CommandTypes } from "enum/CommandTypes";

const commands = [
	{
		label: "/headline",
		type: CommandTypes.HEADLINE,
	},
	{
		label: "/textinput",
		type: CommandTypes.TEXT_INPUT,
	},
	{
		label: "/option",
		type: CommandTypes.OPTION,
	},
];

export default class CommandsRepository {
	async searchAll(): Promise<Command[]> {
		return new Promise((resolve) => {
			resolve(commands);
		});
	}

	async search({ text }: { text: string }): Promise<Command[]> {
		const filteredCommands = commands.filter((item) => item.label.includes(text));

		return new Promise((resolve) => {
			resolve(filteredCommands);
		});
	}
}
