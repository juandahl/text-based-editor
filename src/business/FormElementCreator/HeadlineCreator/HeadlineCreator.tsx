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

const HeadlineCreator = React.forwardRef<HTMLInputElement, HeadlineCreatorProps>(
	({ id, defaultValue = "", onCompleted, onRemove }, ref) => {
		const handlePressEnter = (event: EventCustomInput) => {
			const newValue = event.target.value;
			onCompleted({
				id,
				type: CommandTypes.HEADLINE,
				values: [newValue],
			});
		};

		const handlePressBackSpace = (event: EventCustomInput) => {
			const newValue = event.target.value;
			if (newValue === "") {
				onRemove?.({
					id,
					type: CommandTypes.HEADLINE,
					values: [newValue],
				});
			}
		};

		return (
			<CustomInput
				ref={ref}
				className="heading1"
				placeholder="Heading 1"
				name="Heading1"
				data-testid="heading-input"
				aria-label="Heading"
				defaultValue={defaultValue}
				onPressEnter={handlePressEnter}
				onPressBackSpace={handlePressBackSpace}
			/>
		);
	}
);

export default HeadlineCreator;
