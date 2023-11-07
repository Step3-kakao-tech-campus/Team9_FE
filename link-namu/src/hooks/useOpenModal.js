import { useDispatch } from "react-redux";
import { openModal } from "../store/slices/modalSlice";

const useOpenModal = () => {
  const dispatch = useDispatch();
  return ({ modalType, data }) => {
    dispatch(
      openModal({
        modalType: modalType,
        isOpen: true,
        data: data,
      })
    );
  };
};
export { useOpenModal };
