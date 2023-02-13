import "./CustomInput.css";

import classNames from "classnames";
import React from "react";

export interface EventCustomInput extends React.KeyboardEvent<HTMLInputElement> {
	target: React.KeyboardEvent<HTMLInputElement>["target"] & {
		value: string;
	};
}

interface CustomInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	onPressEnter?: (event: EventCustomInput) => void;
	onPressBackSpace?: (event: EventCustomInput) => void;
}

const CODE_ENTER = "Enter";
const CODE_BACKSPACE = "Backspace";

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
	({ className, onKeyDown, onPressEnter, onPressBackSpace, ...props }, ref) => {
		const handleKeyDown = (event: EventCustomInput) => {
			if (event.code === CODE_ENTER) {
				onPressEnter?.(event);
			}
			if (event.code === CODE_BACKSPACE) {
				onPressBackSpace?.(event);
			}
			onKeyDown?.(event);
		};

		return (
			<input
				type="text"
				{...props}
				ref={ref}
				className={classNames("CustomInput", className)}
				onKeyDown={handleKeyDown}
			/>
		);
	}
);

export default CustomInput;
