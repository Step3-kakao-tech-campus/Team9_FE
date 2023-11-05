import { useDispatch } from "react-redux";
import { closeModal } from "../store/slices/modalSlice";

const useCloseModal = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(closeModal());
  };
};
export { useCloseModal };
