import "./CustomInput.css";

import classNames from "classnames";
import React from "react";

interface CustomInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CODE_ENTER = "Enter";

const CustomInput: React.FC<CustomInputProps> = ({
	className,
	onKeyDown,
	onPressEnter,
	...props
}) => {
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code === CODE_ENTER) {
			onPressEnter?.(event);
		}
		onKeyDown?.(event);
	};

	return (
		<input
			type="text"
			{...props}
			className={classNames("CustomInput", className)}
			onKeyDown={handleKeyDown}
		/>
	);
};

export default CustomInput;
