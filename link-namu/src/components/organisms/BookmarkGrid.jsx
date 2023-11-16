import { useCallback, useEffect, useState } from "react";
import Card from "../molecules/Card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TemporaryStorage from "../molecules/TemporaryStorage";
import { moveBookmark } from "../../apis/bookmark";
import { printToast } from "../../utils/toast";
import AddCard from "../molecules/AddCard";

const BookmarkGrid = ({ bookmarkList, categoryId, handleRefetch }) => {
  // enabled : StrictMode 문제 해결.
  const [enabled, setEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // 드래그 종료
  const onDragEnd = useCallback(
    (result) => {
      setIsOpen(false);

      if (result.destination === null) return;

      // 임시보관함으로 이동
      if (
        result.source.droppableId === "grid" &&
        result.destination.droppableId === "temp"
      ) {
        let tempList = JSON.parse(window.localStorage.getItem("tempList"));
        const dragId = result.draggableId;
        const idLeng = dragId.substring(dragId.lastIndexOf("-") + 1);
        const id = dragId.substring(0, idLeng);
        const title = dragId.substring(idLeng, dragId.lastIndexOf("-"));

        if (tempList === null) {
          tempList = [{ id: id, title: title }];
          console.log(tempList);
        } else {
          // 중복 확인
          if (tempList.find((item) => item.id === id) !== undefined) {
            return;
          }

          tempList = [...tempList, { id: id, title: title }];
          console.log(tempList);
        }

        window.localStorage.setItem("tempList", JSON.stringify(tempList));
      }

      // 그리드로 이동
      if (
        result.source.droppableId === "temp" &&
        result.destination.droppableId === "grid"
      ) {
        const id = result.draggableId;
        let tempList = JSON.parse(window.localStorage.getItem("tempList"));
        tempList = tempList.filter((bookmark) => bookmark.id !== id);

        // 북마크 이동 (서버)
        moveBookmark({ bookmarkIdList: [id], toCategoryId: categoryId })
          .then(res => {
            if (res.status !== 200) {
              const error = res.data?.error;
              console.error(error.message);
              throw new Error(error.errorCode);
            }

            handleRefetch();
            printToast("이동에 성공했습니다.", "success");
          })
          .catch(err => {
            switch (err.message) {
              case "24000":
                printToast("해당 북마크가 이미 존재합니다.", "error");
                break;
              case "24030":
                printToast("북마크에 접근할 권한이 없습니다.", "error");
                break;
              case "24040":
                printToast("해당 북마크가 존재하지 않습니다.", "error");
                break;
              default:
                printToast("이동에 실패했습니다.", "error");
            }
          });

        window.localStorage.setItem("tempList", JSON.stringify(tempList));
      }
      console.log(result);
    },
    [categoryId]
  );

  // 드래그 시작
  const onDragStart = useCallback((result) => {
    setIsOpen(true);
  }, []);

  // 애니메이션 렌더링
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  // console.log("bookmarkGrid", bookmarkList);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <TemporaryStorage isOpen={isOpen} />
      <Droppable droppableId="grid" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className="grid grid-cols-3 gap-x-5 gap-y-10 justify-items-center"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <AddCard categoryId={categoryId} handleRefetch={handleRefetch} />
            {bookmarkList &&
              bookmarkList.map((bookmark) => {
                return (
                  <Card
                    bookmarkId={bookmark.bookmarkId}
                    key={bookmark.bookmarkId}
                    title={bookmark.title}
                    description={bookmark.description}
                    tags={bookmark.tags}
                    imageUrl={bookmark.imageUrl}
                    url={bookmark.url}
                    dragId={
                      bookmark.bookmarkId +
                      bookmark.title +
                      "-" +
                      bookmark.bookmarkId.toString().length
                    }
                    handleRefetch={handleRefetch}
                    // imageUrl={base64Image}
                    imageAlt={bookmark.url}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BookmarkGrid;
