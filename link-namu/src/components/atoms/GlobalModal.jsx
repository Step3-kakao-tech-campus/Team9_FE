import { useSelector } from "react-redux";
import { selectModal } from "../../store/slices/modalSlice";
import { useCloseModal } from "../../hooks/useCloseModal";
import MODALS from "../../constants/modals";

import Container from "./Container";
import Overlay from "./Overlay";

function GlobalModal() {
  const { modalType, isOpen } = useSelector(selectModal);
  const closeModal = useCloseModal();
  if (!isOpen) return;

  const renderModal = () => {
    return MODALS[modalType].component;
  };

  return (
    <Container>
      <Overlay onClick={closeModal} />
      {renderModal()}
    </Container>
  );
}

export default GlobalModal;
