/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
	onBlur: (formElement: FormElement) => void;
	onCompleted: (formElement: FormElement) => void;
	onRemove?: (formElement: FormElement) => void;
}

const HeadlineCreator = React.forwardRef<HTMLInputElement, HeadlineCreatorProps>(
	({ id, defaultValue = "", onCompleted, onBlur, onRemove }, ref) => {
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

		const handleBlur = (
			event: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
			value: string
		) => {
			onBlur({
				id,
				type: CommandTypes.HEADLINE,
				values: [value],
			});
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
				onBlur={handleBlur}
			/>
		);
	}
);

export default HeadlineCreator;
