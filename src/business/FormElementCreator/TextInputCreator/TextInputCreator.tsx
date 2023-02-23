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
	onBlur: (formElement: FormElement) => void;
	onRemove?: (formElement: FormElement) => void;
}

const TextInputCreator = React.forwardRef<HTMLInputElement, TextInputCreatorProps>(
	({ id, defaultValue = "", onCompleted, onBlur, onRemove }, ref) => {
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

		const handleBlur = (
			event: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
			value: string
		) => {
			onBlur({
				id,
				type: CommandTypes.TEXT_INPUT,
				values: [value],
			});
		};

		return (
			<CustomInput
				ref={ref}
				className="TextInputCreator"
				placeholder="Type placeholder text"
				aria-label="text-input-creator"
				name="text-input-creator"
				data-testid="text-input-creator"
				defaultValue={defaultValue}
				onPressEnter={handlePressEnter}
				onPressBackSpace={handlePressBackSpace}
				onBlur={handleBlur}
			/>
		);
	}
);

export default TextInputCreator;
