/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "./TextEditor.css";

// Business
import CommandInput from "business/CommandInput";
import FormElementDraggable from "business/FormElementDraggable/FormElementDraggable";
// Components
import CustomDroppable from "components/CustomDroppable";
// Contexts
import CustomDragDropContext from "contexts/CustomDragDropContext";
import { useFormContext } from "contexts/formContext";
// React
import React from "react";
import { DropResult } from "react-beautiful-dnd";
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
	const { formElements, onCompleted, onRemove, onChangeOrder } = useFormContext();

	// Handlers
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handleFocusElement = () => {
		if (commandInputRef.current) {
			commandInputRef.current.focus();
		}
	};

	const handleDrop = (droppedItem: DropResult) => {
		const destinationOutsideForm = !droppedItem.destination;
		const destinationAboveTitle = droppedItem.destination && droppedItem.destination.index === 0;
		const index = droppedItem.destination?.index;

		if (destinationOutsideForm || destinationAboveTitle || !index) {
			return;
		}

		const updatedList = [...formElements];
		const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
		updatedList.splice(index, 0, reorderedItem);
		onChangeOrder(updatedList);
	};

	return (
		<div className="TextEditor">
			<form className="form" onSubmit={handleSubmit}>
				<CustomDragDropContext onDragEnd={handleDrop}>
					<CustomDroppable droppableId="formDroppable">
						{formElements.map((element, index) => (
							<FormElementDraggable
								element={element}
								index={index}
								onBlur={(formElement: FormElement) => onCompleted(formElement)}
								onCompleted={(formElement: FormElement) =>
									onCompleted(formElement, handleFocusElement)
								}
								onRemove={(formElement: FormElement) => onRemove(formElement, handleFocusElement)}
							/>
						))}
					</CustomDroppable>
				</CustomDragDropContext>

				<CommandInput
					className="commandInput"
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
