interface FormElement {
	id: string;
	type: "HEADLINE" | "OPTION" | "TEXT_INPUT" | "TITLE";
	values: string[];
}

interface FormContext {
	formElements: FormElement[];
	onCompleted: (formElement: FormElement, onUpdateElement?: () => void) => void;
	onRemove: (formElement: FormElement, onRemoveElement: () => void) => void;
	onAdd: (formElement: FormElement, onAddElement: () => void) => void;
	onUpdate: (formElement: FormElement, onUpdateElement?: () => void) => void;
	onAddInBulk: (formElements: FormElement[]) => void;
	onChangeOrder: (form: FormElement[]) => void;
}
