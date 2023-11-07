import { useSelector } from "react-redux";
import { selectModal } from "../store/slices/modalSlice";

export function useModalData() {
  const modal = useSelector(selectModal);
  const modalData = modal.data;
  return modalData;
}
