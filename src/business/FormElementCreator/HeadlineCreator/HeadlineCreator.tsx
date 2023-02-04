// Components
import CustomInput from "components/CustomInput";
import { EventCustomInput } from "components/CustomInput/CustomInput";
// Enums
import { CommandTypes } from "enum/CommandTypes";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeadlineCreatorProps {
	id: string;
	defaultValue?: string;
	onCompleted: (formElement: FormElement) => void;
	onRemove?: (formElement: FormElement) => void;
}

const HeadlineCreator: React.FC<HeadlineCreatorProps> = ({
	id,
	defaultValue = "",
	onCompleted,
	onRemove,
}) => {
	const handlePressEnter = (event: EventCustomInput) => {
		const newValue = event.target.value;
		onCompleted({
			id,
			type: CommandTypes.HEADLINE,
			value: newValue,
		});
	};

	const handlePressBackSpace = (event: EventCustomInput) => {
		const newValue = event.target.value;
		if (newValue === "") {
			onRemove?.({
				id,
				type: CommandTypes.HEADLINE,
				value: newValue,
			});
		}
	};

	return (
		<CustomInput
			autoFocus
			className="heading1"
			placeholder="Heading 1"
			name="Heading1"
			data-testid="heading-input"
			defaultValue={defaultValue}
			onPressEnter={handlePressEnter}
			onPressBackSpace={handlePressBackSpace}
		/>
	);
};

export default HeadlineCreator;
