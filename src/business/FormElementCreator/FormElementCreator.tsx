import "./FormElementCreator.css";

import { CommandTypes } from "enum/CommandTypes";
import React from "react";

import HeadlineCreator from "./HeadlineCreator";
import OptionCreator from "./OptionCreator";
import TextInputCreator from "./TextInputCreator";
import TitleCreator from "./TitleCreator";

export type CommandTypesValues = keyof typeof CommandTypes;

interface FormElementCreatorProps {
	id: string;
	type: CommandTypesValues;
	onCompleted: (formElement: FormElement) => void;
	onBlur: (formElement: FormElement) => void;
	onRemove?: (formElement: FormElement) => void;
	defaultValues?: string[];
}

const OPTION_LENGHT = 3;

const FormElementCreator: React.FC<FormElementCreatorProps> = ({
	id,
	type,
	onCompleted,
	onBlur,
	onRemove,
	defaultValues,
}) => {
	// States
	const ref = React.useRef<HTMLInputElement | null>(null);

	React.useEffect(() => {
		ref.current?.focus();
	}, []);

	const renderFormElementCreator = () => {
		switch (type) {
			case "TITLE":
				return (
					<TitleCreator
						id={id}
						ref={ref}
						onCompleted={onCompleted}
						onBlur={onBlur}
						defaultValue={defaultValues?.[0] ?? ""}
					/>
				);
			case "HEADLINE":
				return (
					<HeadlineCreator
						id={id}
						ref={ref}
						onCompleted={onCompleted}
						onBlur={onBlur}
						onRemove={onRemove}
						defaultValue={defaultValues?.[0] ?? ""}
					/>
				);
			case "OPTION":
				return (
					<OptionCreator
						id={id}
						ref={ref}
						onCompleted={onCompleted}
						onBlur={onBlur}
						onRemove={onRemove}
						defaultValues={
							(defaultValues ?? []).length < OPTION_LENGHT ? new Array(3).fill("") : defaultValues
						}
					/>
				);
			case "TEXT_INPUT":
				return (
					<TextInputCreator
						id={id}
						ref={ref}
						onCompleted={onCompleted}
						onBlur={onBlur}
						onRemove={onRemove}
						defaultValue={defaultValues?.[0] ?? ""}
					/>
				);
			default:
				// eslint-disable-next-line no-case-declarations
				const exhaustiveCheck: never = type;

				return exhaustiveCheck;
		}
	};

	return <div className="FormElementCreator">{renderFormElementCreator()}</div>;
};

export default FormElementCreator;
