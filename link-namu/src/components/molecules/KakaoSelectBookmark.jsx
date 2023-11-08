import { useState, useEffect } from "react";
import BookmarkSelectItem from "../atoms/BookmarkSelectItem";
import Checkbox from "../atoms/Checkbox";
import { createBookmark } from "../../apis/bookmark";

import ModalBox from "../atoms/ModalBox";
import { printToast } from "../../utils/toast";

const KakaoSelectBookmark = ({ data, getLinkList }) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedIdList, setCheckedIdList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState(null);
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");

  useEffect(() => {
    setBookmarkList(getLinkList());
  }, [data]);
  useEffect(() => {
    console.log("bookmarkList", bookmarkList);
  }, [bookmarkList]);

  const changeData = (index, updatedData) => {
    setBookmarkList((prev) => {
      const updatedBookmarkList = [...prev];
      updatedBookmarkList[index] = updatedData;
      return updatedBookmarkList;
    });
  };

  const handleSelectAllClick = () => {
    if (selectAllCheckbox && selectAllCheckbox.checked) {
      const arr = [];
      for (let i = 0; i < bookmarkList?.length; i++) {
        arr.push(i);
      }
      setCheckedIdList(arr);
    } else {
      setCheckedIdList([]);
    }
  };
  const handleSelectAllChange = (e) => {
    setIsAllChecked(e.target.checked);
  };
  const handleCheckedChange = (checked, id) => {
    if (checked) {
      setCheckedIdList([...checkedIdList, id]);
    } else {
      setCheckedIdList(checkedIdList.filter((el) => el !== id));
    }
  };

  useEffect(() => {
    if (bookmarkList?.length > 0)
      setIsAllChecked(checkedIdList.length === bookmarkList?.length);
  }, [checkedIdList]);

  const addBookmarkList = () => {
    const selectedBookmarkList = [];

    try {
      checkedIdList.forEach((id) => {
        if (bookmarkList[id].bookmarkName.length === 0) {
          throw new Error(id + " 북마크 제목은 공백일 수 없습니다.");
        }
        if (!bookmarkList[id].categoryId) {
          throw new Error(id + " 카테고리를 선택해주세요.");
        }
        selectedBookmarkList.push(bookmarkList[id]);
      });
    } catch (err) {
      printToast(err.message, "error");
    }

    console.log("요청할 데이터 : ", selectedBookmarkList);

    selectedBookmarkList.forEach((data, index) => {
      createBookmark({
        bookmarkName: data.bookmarkName,
        bookmarkLink: data.link,
        categoryId: data.categoryId,
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error();
          }

          console.log(index + "번째 항목이 추가되었습니다.");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return {
    content: (
      <div>
        <div className="mx-auto mt-5 text-center">
          <h2 className="text-xl mb-4">발견된 링크</h2>
          <span className="text-sm text-[rgba(0, 0, 0, 0.60)]">
            추가할 링크를 선택해주세요.
          </span>
        </div>
        <ModalBox>
          {bookmarkList &&
            (bookmarkList.length === 0 ? (
              <div>발견된 링크가 없습니다.</div>
            ) : (
              <div className="mx-auto px-5">
                <div className="float-right flex gap-x-3 pr-10">
                  <span>전체 선택</span>
                  <Checkbox
                    id="selectAllCheckbox"
                    checked={isAllChecked}
                    onChange={handleSelectAllChange}
                    onClick={handleSelectAllClick}
                  />
                </div>
                <ul className="h-[450px] w-[800px] mx-auto p-2 overflow-y-scroll overflow-x-clip">
                  {bookmarkList.map((item, index) => {
                    return (
                      <li key={index}>
                        <BookmarkSelectItem
                          id={index}
                          checked={checkedIdList.includes(index)}
                          handleCheckedChange={(e) => {
                            handleCheckedChange(e.target.checked, index);
                          }}
                          title={item?.title}
                          url={item?.link}
                          changeHandler={(data) => {
                            changeData(index, data);
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
        </ModalBox>
      </div>
    ),
    buttonHandler: addBookmarkList,
  };
};

export default KakaoSelectBookmark;
