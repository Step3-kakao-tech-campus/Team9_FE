import { useState, useEffect, Suspense } from "react";
import BookmarkSelectItem from "../atoms/BookmarkSelectItem";
import Checkbox from "../atoms/Checkbox";
import { createBookmark } from "../../apis/bookmark";

import ModalBox from "../atoms/ModalBox";
import { printToast } from "../../utils/toast";
import { Scrollbars } from "react-custom-scrollbars-2";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";
import Loader from "../atoms/Loader";

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
          <ModalTitle>발견된 링크</ModalTitle>
          <ModalSubtitle>추가할 링크를 선택해주세요.</ModalSubtitle>
        </div>
        <ModalBox>
          <div className="h-[450px] flex items-center justify-center">
            {!bookmarkList ? (
              <Loader />
            ) : bookmarkList.length === 0 ? (
              <div>발견된 링크가 없습니다.</div>
            ) : (
              <div className="px-5">
                <div className="float-right flex gap-x-3 pr-10">
                  <span>전체 선택</span>
                  <Checkbox
                    id="selectAllCheckbox"
                    checked={isAllChecked}
                    onChange={handleSelectAllChange}
                    onClick={handleSelectAllClick}
                  />
                </div>
                <ul className="h-[450px] w-[800px] mx-auto p-2">
                  <Scrollbars>
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
                            imageUrl={item?.imageUrl}
                            changeHandler={(data) => {
                              changeData(index, data);
                            }}
                          />
                        </li>
                      );
                    })}
                  </Scrollbars>
                </ul>
              </div>
            )}
          </div>
        </ModalBox>
      </div>
    ),
    buttonHandler: addBookmarkList,
  };
};

export default KakaoSelectBookmark;
