import xIcon from "../../assets/x.png";
import { useCloseModal } from "../../hooks/useCloseModal";

const ModalCloseButton = () => {
  const closeModal = useCloseModal();
  return (
    <button
      onClick={closeModal}
      className="absolute top-0 right-0 w-[15px] h-[15px] m-2"
      style={{
        backgroundImage: `url(${xIcon})`,
        backgroundSize: "cover",
      }}
    />
  );
};

export default ModalCloseButton;
