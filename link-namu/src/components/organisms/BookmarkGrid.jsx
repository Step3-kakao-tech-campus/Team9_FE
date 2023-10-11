import Card from "../molecules/Card";

const BookmarkGrid = ({ bookmarkList }) => {
  console.log("bookmarkGrid", bookmarkList);

  return (
    <>
      <div className="grid grid-cols-4 gap-y-10 justify-items-center p-5">
        {bookmarkList &&
          bookmarkList.map((bookmark) => {
            return (
              <Card
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
