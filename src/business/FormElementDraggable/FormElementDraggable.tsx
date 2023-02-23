import "./FormElementDraggable.css";

// Assets
import dragReorderIcon from "assets/drag-reorder.png";
// Business
import FormElementCreator from "business/FormElementCreator";
// Classnames lib
import classNames from "classnames";
// Components
import CustomDraggable from "components/CustomDraggable";
import CustomImage from "components/CustomImage";
// Enums
import { CommandTypes } from "enum/CommandTypes";
// React
import React from "react";

interface FormElementDraggableProps {
	element: FormElement;
	index: number;
	onBlur: (formElement: FormElement) => void;
	onCompleted: (formElement: FormElement) => void;
	onRemove: (formElement: FormElement) => void;
}

const FormElementDraggable: React.FC<FormElementDraggableProps> = ({
	element,
	index,
	onCompleted,
	onBlur,
	onRemove,
}) => {
	// States
	const [showReorderIcon, setShowReorderIcon] = React.useState(false);

	const isDragDisabled = element.type === CommandTypes.TITLE;

	return (
		<CustomDraggable
			draggableId={element.id}
			index={index}
			onMouseEnter={() => setShowReorderIcon(true)}
			onMouseLeave={() => setShowReorderIcon(false)}
			isDragDisabled={isDragDisabled}
		>
			<ul className="FormElementDraggable">
				<CustomImage
					className={classNames("image", { hidden: !showReorderIcon || isDragDisabled })}
					src={dragReorderIcon as string}
				/>

				<FormElementCreator
					{...element}
					key={element.id}
					defaultValues={element.values}
					onCompleted={(newElement: FormElement) => onCompleted(newElement)}
					onBlur={(newElement: FormElement) => onBlur(newElement)}
					onRemove={(newElement: FormElement) => onRemove(newElement)}
				/>
			</ul>
		</CustomDraggable>
	);
};

export default FormElementDraggable;
