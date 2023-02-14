interface FormElement {
	id: string;
	type: "HEADLINE" | "OPTION" | "TEXT_INPUT" | "TITLE";
	values: string[];
}
