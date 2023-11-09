import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalBox from "../atoms/ModalBox";
import { useCloseModal } from "../../hooks/useCloseModal";
import SingleStepModalBase from "./SingleStepModalBase";
import { useModalData } from "../../hooks/useModalData";
import { printToast } from "../../utils/toast";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";
import { deleteBookmark } from "../../apis/bookmark";

const BookmarkDeleteModal = ({ data }) => {
  const closeModal = useCloseModal();
  const modalData = useModalData();
  const { refetchData } = useWorkspaceList();

  const deleteBookmarkHandler = () => {
    deleteBookmark({
      bookmarkId: modalData?.bookmarkId,
    })
      .then(res => {
        if (res.status === 200) {
          const msg = "북마크가 삭제되었습니다.";
          printToast(msg, "success");
          refetchData();
          closeModal();
        } else {
          throw new Error(res.data?.error?.message);
        }
      })
      .catch(err => {
        const msg = `북마크 삭제에 실패하였습니다.`;
        printToast(msg, "error");
        console.log(msg);
      });
  };

  const content = (
    <>
      <ModalTitle>북마크 삭제</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>북마크를 삭제하시겠습니까?</ModalSubtitle>
        </div>
      </ModalBox>
    </>
  );

  return (
    <>
      <SingleStepModalBase
        size="md"
        buttonName="삭제"
        clickHandler={deleteBookmarkHandler}
      >
        {content}
      </SingleStepModalBase>
    </>
  );
};

export default BookmarkDeleteModal;
