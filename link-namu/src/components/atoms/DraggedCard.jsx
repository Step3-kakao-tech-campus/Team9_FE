import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import x from "../../assets/x.png";

const DraggedCard = ({ id, title, setCardList }) => {
  const [isErase, setIsErase] = useState(false);

  return (
    <Draggable key={id} draggableId={id} index={1}>
      {provided => (
        <div
          className={`w-56 h-24 p-4 m-1 bg-white border-2 rounded-md shadow-md hover:bg-green-200
            ${isErase && `hover:bg-red-300`}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="float-right w-5 p-1"
            onMouseEnter={() => setIsErase(true)}
            onMouseLeave={() => setIsErase(false)}
            onClick={() => {
              let tempList = JSON.parse(
                window.localStorage.getItem("tempList")
              );
              tempList = tempList.filter(bookmark => bookmark.id !== id);
              window.localStorage.setItem("tempList", JSON.stringify(tempList));
              setCardList(tempList);
            }}
          >
            <img src={x} alt="X" className="w-3 hover:opacity-50 " />
          </div>
          <div className="overflow-hidden font-bold break-all text-ellipsis whitespace-nowrap">
            {title}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(DraggedCard);
