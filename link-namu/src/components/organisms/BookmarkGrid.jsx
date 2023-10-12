import Card from "../molecules/Card";

const BookmarkGrid = ({ bookmarkList }) => {
  console.log("bookmarkGrid", bookmarkList);

  return (
    <>
      <div className="grid grid-cols-3 gap-y-10 justify-items-center p-10">
        {bookmarkList &&
          bookmarkList.map((bookmark) => {
            return (
              <Card
                key={bookmark.bookmarkId}
                title={bookmark.title}
                description={bookmark.description}
                tags={bookmark.tags}
                imageUrl={bookmark.imageUrl}
                imageAlt={bookmark.url}
              />
            );
          })}
      </div>
    </>
  );
};

export default BookmarkGrid;
