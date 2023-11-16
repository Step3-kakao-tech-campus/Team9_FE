import NonDraggableCard from "../molecules/NonDraggableCard";

const SharedBookmarkGrid = ({ bookmarkList }) => {
  console.log("bookmarkGrid", bookmarkList);

  return (
    <>
      <div className="w-auto mx-auto grid grid-cols-3 gap-x-5 gap-y-10 justify-items-center p-10">
        {bookmarkList &&
          bookmarkList.map((bookmark) => {
            return (
              <NonDraggableCard
                key={bookmark.bookmarkId}
                imageUrl={bookmark.imageUrl}
                imageAlt={bookmark.url}
                url={bookmark.url}
                title={bookmark.title}
                description={bookmark.description}
                tags={bookmark.tags}
              />
            );
          })}
      </div>
    </>
  );
};

export default SharedBookmarkGrid;
