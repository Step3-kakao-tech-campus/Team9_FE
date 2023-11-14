import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggedCard from "../atoms/DraggedCard";
import Scrollbars from "react-custom-scrollbars-2";

import x from "../../assets/x.png";

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

  const closeStorage = () => {
    window.localStorage.removeItem("tempList");
    setCardList([]);
  };

  return (
    <div
      className={`fixed top-[56px] right-[60px] bottom-0 flex flex-col w-80 border-l bg-slate-50 shadow-2xl ${
        isOpen || isContents ? `opacity-1 z-50` : `opacity-0 z-0`
      }`}
    >
      <div className="absolute w-12 p-4 cursor-pointer" onClick={closeStorage}>
        <img
          src={x}
          alt="close"
          aria-label="임시보관함 닫기"
          className="w-4 hover:opacity-50"
        />
      </div>
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
                      setCardList={setCardList}
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
