import "./TextEditor.css";

// Business
import CommandInput from "business/CommandInput";
import FormElementCreator from "business/FormElementCreator";
// React
import React from "react";
// Services
import CommandsRepository from "services/CommandsRepository";
// Utils
import { generateKey } from "utils/Uuid";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TextEditorProps {}

const commandsRepository = new CommandsRepository();

const TextEditor: React.FC<TextEditorProps> = () => {
	// Refs
	const commandInputRef = React.useRef<HTMLInputElement | null>(null);

	// States
	const [id, setId] = React.useState<string>(generateKey());
	const [commandSelected, setCommandSelected] = React.useState<Command | undefined>();
	const [formElements, setFormElements] = React.useState<FormElement[]>([]);

	// Effects
	React.useEffect(() => {
		if (!commandSelected && commandInputRef.current) {
			commandInputRef.current.focus();
		}
	}, [commandSelected]);

	// Handlers
	const handleAddElementToForm = (formElement: FormElement) => {
		setFormElements((prev) => [...prev, formElement]);
		setCommandSelected(undefined);
	};

	const handleRemoveElementFromForm = (formElement: FormElement) => {
		setFormElements((prev) => {
			const result = prev.filter((item) => item.id !== formElement.id);

			return [...result];
		});
		setCommandSelected(undefined);
	};

	return (
		<div className="TextEditor">
			{formElements.map((element) => (
				<FormElementCreator
					{...element}
					key={element.value}
					defaultValue={element.value}
					onCompleted={handleAddElementToForm}
					onRemove={handleRemoveElementFromForm}
				/>
			))}

			{commandSelected && (
				<FormElementCreator
					id={id}
					type={commandSelected.type}
					onCompleted={handleAddElementToForm}
				/>
			)}

			<CommandInput
				ref={commandInputRef}
				commandsRepository={commandsRepository}
				onCommandSelected={(command: Command) => {
					setCommandSelected(command);
					setId(() => generateKey());
				}}
			/>
		</div>
	);
};

export default TextEditor;
