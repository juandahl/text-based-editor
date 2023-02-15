import "./TextEditor.css";

// Business
import CommandInput from "business/CommandInput";
import FormElementCreator from "business/FormElementCreator";
// Contexts
import { useFormContext } from "contexts/formContext";
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

	// Context
	const { formElements, onCompleted, onRemove } = useFormContext();

	// Handlers
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handleFocusElement = () => {
		if (commandInputRef.current) {
			commandInputRef.current.focus();
		}
	};

	return (
		<div className="TextEditor">
			<form className="form" onSubmit={handleSubmit}>
				{formElements.map((element) => (
					<FormElementCreator
						{...element}
						key={element.id}
						defaultValues={element.values}
						onCompleted={(formElement: FormElement) => onCompleted(formElement, handleFocusElement)}
						onChange={(formElement: FormElement) => onCompleted(formElement)}
						onRemove={(formElement: FormElement) => onRemove(formElement, handleFocusElement)}
					/>
				))}

				<CommandInput
					ref={commandInputRef}
					commandsRepository={commandsRepository}
					onCommandSelected={(command: Command) => {
						const newFormElement: FormElement = {
							id: generateKey(),
							type: command.type,
							values: [""],
						};

						onCompleted(newFormElement, handleFocusElement);
					}}
				/>

				<button className="submit" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default TextEditor;
