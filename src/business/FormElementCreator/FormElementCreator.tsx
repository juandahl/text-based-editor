import "./FormElementCreator.css";

import { CommandTypes } from "enum/CommandTypes";
import React from "react";

import HeadlineCreator from "./HeadlineCreator";

export type CommandTypesValues = keyof typeof CommandTypes;

interface FormElementCreatorProps {
	type: CommandTypesValues;
	onCompleted: (formElement: FormElement) => void;
}

const FormElementCreator: React.FC<FormElementCreatorProps> = ({ type }) => {
	const renderFormElementCreator = () => {
		switch (type) {
			case "HEADLINE":
				return <HeadlineCreator />;
			case "OPTION":
				return <h1>TODO: implement it</h1>;
			case "TEXT_INPUT":
				return <h1>TODO: implement it</h1>;
			default:
				// eslint-disable-next-line no-case-declarations
				const exhaustiveCheck: never = type;

				return exhaustiveCheck;
		}
	};

	return <div className="FormElementCreator">{renderFormElementCreator()}</div>;
};

export default FormElementCreator;
