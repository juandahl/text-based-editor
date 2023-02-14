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
	count?: number;
	onCompleted: (formElement: FormElement) => void;
	onRemove?: (formElement: FormElement) => void;
}

interface Option {
	id: string;
	ref: React.MutableRefObject<HTMLInputElement | null>;
	defaultValue: string;
}

const OptionCreator = React.forwardRef<HTMLInputElement, OptionCreatorProps>(
	({ id, defaultValues, count = 1, onCompleted, onRemove }, ref) => {
		const [options, setOptions] = React.useState<Option[]>([]);

		// Effects
		React.useEffect(() => {
			const result = [];
			for (let index = 0; index < count; index++) {
				const option: Option = {
					defaultValue: defaultValues?.[index] ?? "",
					id: generateKey(),
					ref: index === 0 ? (ref as React.RefObject<HTMLInputElement>) : React.createRef(),
				};

				result.push(option);
			}

			setOptions(result);
		}, [ref]);

		const handlePressEnter = (event: EventCustomInput, option: Option, position: number) => {
			const isLast = position === options.length - 1;
			if (isLast) {
				const values = options.map((item: Option) => item.ref.current?.value ?? "");
				onCompleted({
					id,
					type: CommandTypes.OPTION,
					values,
				});
			} else {
				const next = options.at(position + 1);
				next?.ref.current?.focus();
			}
		};

		const handlePressBackSpace = (event: EventCustomInput, option: Option, position: number) => {
			const newValue = event.target.value;
			const isFirst = position === 0;
			const isEmpty = newValue === "";

			if (isFirst && isEmpty) {
				const values = options.map((item: Option) => item.ref.current?.value ?? "");
				onRemove?.({
					id,
					type: CommandTypes.OPTION,
					values,
				});
			}

			if (!isFirst && isEmpty) {
				const previous = options.at(position - 1);
				previous?.ref.current?.focus();
			}
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
						onPressEnter={(event) => handlePressEnter(event, item, index)}
						onPressBackSpace={(event) => handlePressBackSpace(event, item, index)}
						autoFocus={index === 0}
					/>
				))}
			</div>
		);
	}
);

export default OptionCreator;
