interface Command {
	type: "HEADLINE" | "TEXT_INPUT" | "OPTION" | "TITLE";
	label: string;
}
