import React from "react";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";

type CustomDragDropContextProps = DragDropContextProps;

const CustomDragDropContext: React.FC<CustomDragDropContextProps> = (props) => {
	return <DragDropContext {...props}>{props.children}</DragDropContext>;
};

export default CustomDragDropContext;
