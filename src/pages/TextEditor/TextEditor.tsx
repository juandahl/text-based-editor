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
	const [formElements, setFormElements] = React.useState<FormElement[]>([]);

	// Handlers
	const handleAddElementToForm = (formElement: FormElement) => {
		const elementIndex = formElements.findIndex((item: FormElement) => item.id === formElement.id);
		if (elementIndex === -1) {
			setFormElements((prev) => [...prev, formElement]);
		}
	};

	const handleUpdateElementToForm = (formElement: FormElement) => {
		const elementIndex = formElements.findIndex((item: FormElement) => item.id === formElement.id);
		if (elementIndex !== -1) {
			setFormElements((prev) =>
				prev.map((item) => {
					if (item.id === formElement.id) {
						return formElement;
					}

					return item;
				})
			);
		}

		if (commandInputRef.current) {
			commandInputRef.current.focus();
		}
	};

	const handleRemoveElementFromForm = (formElement: FormElement) => {
		setFormElements((prev) => {
			const result = prev.filter((item) => item.id !== formElement.id);

			return [...result];
		});
	};

	const handleCompleted = (formElement: FormElement) => {
		const elementIndex = formElements.findIndex((item: FormElement) => item.id === formElement.id);
		const alreadyExists = elementIndex !== -1;
		if (alreadyExists) {
			handleUpdateElementToForm(formElement);
		} else {
			handleAddElementToForm(formElement);
		}
	};

	return (
		<div className="TextEditor">
			{formElements.map((element) => (
				<FormElementCreator
					{...element}
					key={element.value}
					defaultValue={element.value}
					onCompleted={handleCompleted}
					onRemove={handleRemoveElementFromForm}
				/>
			))}

			<CommandInput
				ref={commandInputRef}
				commandsRepository={commandsRepository}
				onCommandSelected={(command: Command) => {
					const newFormElement: FormElement = {
						id: generateKey(),
						type: command.type,
						value: "",
					};

					handleCompleted(newFormElement);
				}}
			/>
		</div>
	);
};

export default TextEditor;
