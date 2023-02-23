import "./TitleCreator.css";

// Components
import CustomInput from "components/CustomInput";
import { EventCustomInput } from "components/CustomInput/CustomInput";
// Enums
import { CommandTypes } from "enum/CommandTypes";
import React from "react";

interface TitleCreatorProps {
	id: string;
	defaultValue?: string;
	onCompleted: (formElement: FormElement) => void;
	onBlur: (formElement: FormElement) => void;
}

const TitleCreator = React.forwardRef<HTMLInputElement, TitleCreatorProps>(
	({ id, defaultValue = "", onCompleted, onBlur }, ref) => {
		const handlePressEnter = (event: EventCustomInput) => {
			const newValue = event.target.value;
			onCompleted({
				id,
				type: CommandTypes.TITLE,
				values: [newValue],
			});
		};

		const handleBlur = (newValue: string) => {
			onBlur({
				id,
				type: CommandTypes.TITLE,
				values: [newValue],
			});
		};

		return (
			<CustomInput
				ref={ref}
				className="TitleCreator"
				placeholder="Title"
				name="form-title"
				data-testid="form-title"
				aria-label="form-title"
				defaultValue={defaultValue}
				onPressEnter={handlePressEnter}
				onBlur={(event, value) => handleBlur(value)}
			/>
		);
	}
);

export default TitleCreator;
