import { CommandTypes } from "enum/CommandTypes";
import React from "react";
import { generateKey } from "utils/Uuid";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

/**
 * Form Context Creation.
 */
export const formContext = React.createContext<FormContext>({
	formElements: [],
	onCompleted: noop,
	onRemove: noop,
	onAdd: noop,
	onUpdate: noop,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onAddInBulk: () => {},
});

const defaultFormElements: FormElement[] = [
	{
		id: generateKey(),
		type: CommandTypes.TITLE,
		values: [""],
	},
];

/**
 * Hook for Form functions.
 */
const useFormProvider = (): FormContext => {
	// States
	const [formElements, setFormElements] = React.useState<FormElement[]>(defaultFormElements);

	// Handlers
	const handleAddElementToForm = (formElement: FormElement) => {
		const elementIndex = formElements.findIndex((item: FormElement) => item.id === formElement.id);
		if (elementIndex === -1) {
			setFormElements((prev) => [...prev, formElement]);
		}
	};

	const handleUpdateElementToForm = (formElement: FormElement, onUpdateElement: () => void) => {
		const elementIndex = formElements.findIndex((item: FormElement) => item.id === formElement.id);
		if (elementIndex !== -1) {
			setFormElements((prev) =>
				prev.map((item) => {
					if (item.id === formElement.id) {
						return formElement;
					}

					return item;
				})
			);
		}

		onUpdateElement();
	};

	const handleRemoveElementFromForm = (formElement: FormElement, onRemoveElement: () => void) => {
		onRemoveElement();
		// commandInputRef.current?.focus();

		setFormElements((prev) => {
			const result = prev.filter((item) => item.id !== formElement.id);

			return [...result];
		});
	};

	const handleCompleted = (formElement: FormElement, onUpdateElement: () => void) => {
		const elementIndex = formElements.findIndex((item: FormElement) => item.id === formElement.id);
		const alreadyExists = elementIndex !== -1;
		if (alreadyExists) {
			handleUpdateElementToForm(formElement, onUpdateElement);
		} else {
			handleAddElementToForm(formElement);
		}
	};

	const handleAddInbulk = (form: FormElement[]) => {
		setFormElements(form);
	};

	return {
		formElements,
		onAddInBulk: handleAddInbulk,
		onCompleted: handleCompleted,
		onRemove: handleRemoveElementFromForm,
		onAdd: handleAddElementToForm,
		onUpdate: handleUpdateElementToForm,
	};
};

/**
 * Form Context Provider Creation.
 * @param children React.PropsWithChildren
 */
export function FormProvider({ children }: React.PropsWithChildren) {
	const value = useFormProvider();

	return <formContext.Provider value={value}>{children}</formContext.Provider>;
}
