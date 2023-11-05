import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggedCard = ({ id, title }) => {
  return (
    <Draggable key={id} draggableId={id} index={1}>
      {provided => (
        <div
          className="w-56 h-24 p-4 m-1 bg-white border-2 rounded-md shadow-md"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="overflow-hidden font-bold text-ellipsis">{title}</div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(DraggedCard);
