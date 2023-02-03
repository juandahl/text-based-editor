import "./TextEditor.css";

// Business
import CommandInput from "business/CommandInput/CommandInput";
// React
import React from "react";
import CommandsRepository from "services/CommandsRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TextEditorProps {}

const commandsRepository = new CommandsRepository();

const TextEditor: React.FC<TextEditorProps> = () => {
	return (
		<div className="TextEditor">
			<CommandInput commandsRepository={commandsRepository} />
		</div>
	);
};

export default TextEditor;
