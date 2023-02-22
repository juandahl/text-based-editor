import "./OptionCreator.css";

// Components
import CustomInput from "components/CustomInput";
import { EventCustomInput } from "components/CustomInput/CustomInput";
// Enums
import { CommandTypes } from "enum/CommandTypes";
import React from "react";
import { generateKey } from "utils/Uuid";

interface OptionCreatorProps {
	id: string;
	defaultValues?: string[];
	onCompleted: (formElement: FormElement) => void;
	onChange: (formElement: FormElement) => void;
	onRemove?: (formElement: FormElement) => void;
}

interface Option {
	id: string;
	ref?: React.MutableRefObject<HTMLInputElement | null>;
	defaultValue: string;
	value: string;
}

const OptionCreator = React.forwardRef<HTMLInputElement, OptionCreatorProps>(
	({ id, defaultValues = [], onCompleted, onChange, onRemove }, ref) => {
		const [options, setOptions] = React.useState<Option[]>(
			defaultValues.map((value) => ({
				defaultValue: value,
				value,
				id: generateKey(),
			}))
		);

		// Effects
		React.useEffect(() => {
			setOptions((prevOptions) =>
				prevOptions.map((option, index) => ({
					...option,
					ref: index === 0 ? (ref as React.RefObject<HTMLInputElement>) : React.createRef(),
				}))
			);
		}, [ref]);

		// Handlers
		const handlePressEnter = (event: EventCustomInput, option: Option, position: number) => {
			const isLast = position === options.length - 1;
			if (!isLast) {
				const next = options.at(position + 1);
				next?.ref?.current?.focus();
			} else {
				const values = options.map((item: Option) => item.value);
				onCompleted({
					id,
					type: CommandTypes.OPTION,
					values,
				});
			}
		};

		const handleBlur = (position: number) => {
			const isLast = position === options.length - 1;
			if (isLast) {
				const values = options.map((item: Option) => item.value);
				onChange({
					id,
					type: CommandTypes.OPTION,
					values,
				});
			}
		};

		const handlePressBackSpace = (event: EventCustomInput, option: Option, position: number) => {
			const newValue = event.target.value;
			const isFirst = position === 0;
			const isEmpty = newValue === "";

			if (isFirst && isEmpty) {
				const values = options.map((item: Option) => item.value);
				onRemove?.({
					id,
					type: CommandTypes.OPTION,
					values,
				});
			}

			if (!isFirst && isEmpty) {
				const previous = options.at(position - 1);
				previous?.ref?.current?.focus();
			}
		};

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>, option: Option) => {
			const newOptions = options.map((prevOption) =>
				prevOption.id === option.id
					? {
							...prevOption,
							value: event.target.value,
					  }
					: prevOption
			);
			setOptions(newOptions);
		};

		return (
			<div className="OptionCreator">
				{options.map((item, index) => (
					<CustomInput
						key={item.id}
						ref={item.ref}
						className="OptionCreator"
						placeholder={`Type Option ${index + 1}`}
						aria-labelledby={`option-${index + 1}`}
						name={`{option-${index + 1}`}
						data-testid={`{option-${index + 1}`}
						defaultValue={item.defaultValue}
						value={item.value}
						onPressEnter={(event) => handlePressEnter(event, item, index)}
						onPressBackSpace={(event) => handlePressBackSpace(event, item, index)}
						onChange={(event) => handleChange(event, item)}
						onBlur={() => handleBlur(index)}
						autoFocus={index === 0}
					/>
				))}
			</div>
		);
	}
);

export default OptionCreator;
