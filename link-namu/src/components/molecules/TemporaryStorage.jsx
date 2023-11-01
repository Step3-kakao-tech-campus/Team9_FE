import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

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
      className={`fixed top-0 right-0 flex flex-col w-80 h-screen border-l bg-slate-200 ${
        isOpen || isContents ? `opacity-1 z-50` : `opacity-0 z-0`
      }`}
    >
      <div>
        <h3 className="m-4 text-2xl font-bold text-center">임시보관함</h3>
      </div>
      <Droppable droppableId="temp">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-96"
          >
            {cardList &&
              cardList.map(bookmark => {
                return (
                  <Card
                    key={bookmark.id}
                    bookmarkId={bookmark.id}
                    dragId={bookmark.id}
                    title={bookmark.title}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TemporaryStorage;