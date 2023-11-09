import { useCallback, useEffect, useState } from "react";
import Card from "../molecules/Card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TemporaryStorage from "../molecules/TemporaryStorage";
import { useMutation } from "react-query";
import { moveBookmark } from "../../apis/bookmark";
import { printToast } from "../../utils/toast";
import AddCard from "../molecules/AddCard";

const base64Image =
  "data:image/png;base64,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";
const BookmarkGrid = ({ bookmarkList, categoryId }) => {
  // enabled : StrictMode 문제 해결.
  const [enabled, setEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: moveBookmark,
  });

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
        mutate(
          { bookmarkIdList: [id], toCategoryId: categoryId },
          {
            onError: (error) => {
              console.log(error.response.data.error.message);
              printToast("이동에 실패했습니다.", "error");
              return;
            },
            onSuccess: () => {
              printToast(
                "이동에 성공했습니다.\n새로고침됩니다.",
                "success",
                () => window.location.reload()
              );
            },
          }
        );

        window.localStorage.setItem("tempList", JSON.stringify(tempList));
      }
      console.log(result);
    },
    [categoryId, mutate]
  );

  // 드래그 시작
  const onDragStart = useCallback(result => {
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

  console.log("bookmarkGrid", bookmarkList);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <TemporaryStorage isOpen={isOpen} />
      <Droppable droppableId="grid" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className="grid grid-cols-3 p-10 gap-y-10 justify-items-center"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <AddCard categoryId={categoryId} />
            {bookmarkList &&
              bookmarkList.map(bookmark => {
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
