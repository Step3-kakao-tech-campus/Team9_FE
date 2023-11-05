import { useDispatch } from "react-redux";
import { openModal } from "../store/slices/modalSlice";

const useOpenModal = () => {
  const dispatch = useDispatch();
  return ({ modalType }) => {
    dispatch(
      openModal({
        modalType: modalType,
        isOpen: true,
      })
    );
  };
};
export { useOpenModal };
