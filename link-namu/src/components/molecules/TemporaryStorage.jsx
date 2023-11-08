import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggedCard from "../atoms/DraggedCard";
import Scrollbars from "react-custom-scrollbars-2";

const TemporaryStorage = ({ isOpen }) => {
  const [isContents, setIsContents] = useState(false);
  const [cardList, setCardList] = useState([]);

  // 드래그가 끝나는 경우
  useEffect(() => {
    setCardList(JSON.parse(window.localStorage.getItem("tempList")));
  }, [isOpen]);

  useEffect(() => {
    if (cardList === null || cardList.length === 0) {
      setIsContents(false);
    } else {
      setIsContents(true);
    }
  }, [cardList]);

  return (
    <div
      className={`fixed top-[56px] right-[60px] bottom-0 flex flex-col w-80 border-l bg-slate-200 ${
        isOpen || isContents ? `opacity-1 z-50` : `opacity-0 z-0`
      }`}
    >
      <div>
        <h3 className="m-4 text-2xl font-bold text-center">임시보관함</h3>
      </div>
      <Droppable droppableId="temp" direction="vertical">
        {(provided, snapshot) => (
          <Scrollbars>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="h-[100%] flex flex-col items-center"
            >
              {cardList &&
                cardList.map((bookmark) => {
                  return (
                    <DraggedCard
                      key={bookmark.id}
                      id={bookmark.id}
                      title={bookmark.title}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          </Scrollbars>
        )}
      </Droppable>
    </div>
  );
};

export default TemporaryStorage;
