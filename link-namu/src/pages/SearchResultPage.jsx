import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchResultTemplate from "../components/templates/SearchResultTemplate";
import Searchbar from "../components/atoms/Searchbar";
import Loader from "../components/atoms/Loader";
import DetailSearchBox from "../components/atoms/DetailSearchBox";

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [detailSearchValue, setDetailSearchValue] = useState({
    bookmarkName: null,
    bookmarkDescription: null,
    bookmarkLink: null,
    workspaceName: null,
    tags: [],
  });

  const getData = () => {
    const convertEmptyToNull = (value) => {
      if (value === "" || (Array.isArray(value) && value.length === 0)) {
        return null;
      }
      return value;
    };

    const data = detailSearchValue;
    for (const key in data) {
      data[key] = convertEmptyToNull(data[key]);
    }

    return data;
  };
  const searchDetail = () => {
    navigate("/search/result", {
      state: getData(),
    });
  };

  useEffect(() => {
    console.log("state", location.state);
  }, []);
  useEffect(() => {
    console.log("상세 검색 값", detailSearchValue);
  }, [detailSearchValue]);

  return (
    <div className="flex flex-col items-center ">
      <div className="mx-auto my-5">
        <Searchbar />
        <DetailSearchBox
          value={detailSearchValue}
          changeHandler={setDetailSearchValue}
          clickHandler={searchDetail}
        />
      </div>
      <div className="w-full border-b"></div>
      <div className="w-[1280px] mx-auto">
        <Suspense fallback={<Loader />}>
          <SearchResultTemplate
            bookmarkName={location.state.bookmarkName}
            bookmarkLink={location.state.bookmarkLink}
            bookmarkDescription={location.state.bookmarkDescription}
            workspaceName={location.state.workspaceName}
            tags={location.state.tags}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchResultPage;
