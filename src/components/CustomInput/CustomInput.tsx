import "./CustomInput.css";

import classNames from "classnames";
import React from "react";

type CustomInputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const CustomInput: React.FC<CustomInputProps> = ({ className, ...props }) => {
	return <input type="text" {...props} className={classNames("CustomInput", className)} />;
};

export default CustomInput;
