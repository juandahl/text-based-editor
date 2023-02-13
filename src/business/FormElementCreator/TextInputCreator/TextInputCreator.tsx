import "./TextInputCreator.css";

// Components
import CustomInput from "components/CustomInput";
import { EventCustomInput } from "components/CustomInput/CustomInput";
// Enums
import { CommandTypes } from "enum/CommandTypes";
import React from "react";

interface TextInputCreatorProps {
	id: string;
	defaultValue?: string;
	onCompleted: (formElement: FormElement) => void;
	onRemove?: (formElement: FormElement) => void;
}

const TextInputCreator: React.FC<TextInputCreatorProps> = ({
	id,
	defaultValue = "",
	onCompleted,
	onRemove,
}) => {
	const handlePressEnter = (event: EventCustomInput) => {
		const newValue = event.target.value;
		onCompleted({
			id,
			type: CommandTypes.TEXT_INPUT,
			values: [newValue],
		});
	};

	const handlePressBackSpace = (event: EventCustomInput) => {
		const newValue = event.target.value;
		if (newValue === "") {
			onRemove?.({
				id,
				type: CommandTypes.TEXT_INPUT,
				values: [newValue],
			});
		}
	};

	return (
		<CustomInput
			className="TextInputCreator"
			placeholder="Type placeholder text"
			aria-labelledby="text-input-creator"
			name="text-input-creator"
			data-testid="text-input-creator"
			defaultValue={defaultValue}
			onPressEnter={handlePressEnter}
			onPressBackSpace={handlePressBackSpace}
		/>
	);
};

export default TextInputCreator;
