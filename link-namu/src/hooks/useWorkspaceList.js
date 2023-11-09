import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setWorkspaceList } from "../store/slices/workspaceSlice";
import { getWorkspaceList } from "../apis/workspace";
import { getAccessToken } from "../store";
import { useEffect } from "react";

const useWorkspaceList = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);

  const {
    data: workspaceData,
    isLoading,
    isError,
    refetch,
  } = useQuery("workspaceList", getWorkspaceList);

  const refetchData = async () => {
    await refetch();
  };

  useEffect(() => {
    if (accessToken) {
      refetchData();
    }
  }, [accessToken]);

  if (isLoading) {
    console.log("워크스페이스 리스트 로딩 중");
    return { isLoading: true };
  }

  // 데이터 로딩 중 에러가 발생한 경우
  if (isError) {
    console.log("워크스페이스 리스트 로딩 에러");
    return { isError: true };
  }

  if (workspaceData) {
    // console.log("workspaceData", workspaceData);
    if (workspaceData.status === 200) {
      dispatch(
        setWorkspaceList({ workspaceList: workspaceData.data?.response })
      );
    }
  }

  return { workspaceData, refetchData, isLoading, isError };
};

export { useWorkspaceList };
