import React from "react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";

interface CustomDraggableProps extends Omit<DraggableProps, "children"> {
	children: React.ReactNode;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

const CustomDraggable: React.FC<CustomDraggableProps> = ({
	draggableId,
	children,
	onMouseEnter,
	onMouseLeave,
	...props
}) => {
	return (
		<Draggable key={draggableId} draggableId={draggableId} {...props}>
			{(draggableProvided) => (
				<div
					{...draggableProvided.dragHandleProps}
					ref={draggableProvided.innerRef}
					{...draggableProvided.draggableProps}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				>
					{children}
				</div>
			)}
		</Draggable>
	);
};

export default CustomDraggable;
