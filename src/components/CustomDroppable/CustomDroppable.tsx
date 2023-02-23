import React from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

interface CustomDroppableProps extends Omit<DroppableProps, "children"> {
	children: React.ReactNode;
}

const CustomDroppable: React.FC<CustomDroppableProps> = ({ children, ...props }) => {
	return (
		<Droppable {...props}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					{children}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default CustomDroppable;
