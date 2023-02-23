/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import "./CustomInput.css";

import classNames from "classnames";
import React from "react";

export interface EventCustomInput extends React.KeyboardEvent<HTMLInputElement> {
	target: React.KeyboardEvent<HTMLInputElement>["target"] & {
		value: string;
	};
}

interface CustomInputProps
	extends Omit<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"onBlur"
	> {
	onPressEnter?: (event: EventCustomInput) => void;
	onPressBackSpace?: (event: EventCustomInput) => void;
	onBlur?: (
		event: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		value: string
	) => void;
}

const CODE_ENTER = "Enter";
const CODE_BACKSPACE = "Backspace";

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
	({ className, onKeyDown, onPressEnter, onPressBackSpace, onBlur, ...props }, ref) => {
		const [value, setValue] = React.useState("");

		// Handlers
		const handleKeyDown = (event: EventCustomInput) => {
			if (event.code === CODE_ENTER) {
				onPressEnter?.(event);
			}
			if (event.code === CODE_BACKSPACE) {
				onPressBackSpace?.(event);
			}
			onKeyDown?.(event);
		};

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
			props.onChange?.(event);
		};

		const handleBlur = (
			event: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
		) => {
			onBlur?.(event, value);
		};

		return (
			<input
				type="text"
				{...props}
				ref={ref}
				className={classNames("CustomInput", className)}
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		);
	}
);

export default CustomInput;
