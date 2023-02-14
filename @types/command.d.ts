interface Command {
	type: "HEADLINE" | "TEXT_INPUT" | "OPTION";
	label: string;
}
