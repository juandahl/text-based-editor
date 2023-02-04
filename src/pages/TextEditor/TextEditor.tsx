import "./TextEditor.css";

// Business
import CommandInput from "business/CommandInput";
import FormElementCreator from "business/FormElementCreator";
// React
import React from "react";
// Services
import CommandsRepository from "services/CommandsRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TextEditorProps {}

const commandsRepository = new CommandsRepository();

const TextEditor: React.FC<TextEditorProps> = () => {
	// States
	const [commandSelected, setCommandSelected] = React.useState<Command | undefined>();
	const [formElements, setFormElements] = React.useState<FormElement[]>([]);

	const handleAddElementToForm = (formElement: FormElement) => {
		// TODO: do something
	};

	// eslint-disable-next-line no-console
	console.log({ commandSelected });

	return (
		<div className="TextEditor">
			{commandSelected && (
				<FormElementCreator type={commandSelected.type} onCompleted={handleAddElementToForm} />
			)}

			<CommandInput
				commandsRepository={commandsRepository}
				onCommandSelected={(command: Command) => setCommandSelected(command)}
			/>
		</div>
	);
};

export default TextEditor;
