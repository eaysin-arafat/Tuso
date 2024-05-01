import {
  closeAddModal,
  closeEditModal,
  closeViewModal,
} from "@/features/modal/modal-slice";
import { useDispatch } from "react-redux";

const useCloseModal = () => {
  const dispatch = useDispatch();

  const closeCreateModal = () => {
    dispatch(closeAddModal());
  };

  const closeUpdateModal = () => {
    dispatch(closeEditModal());
  };

  const closeReadModal = () => {
    dispatch(closeViewModal());
  };

  const toggler = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  return {
    closeAddModal: closeCreateModal,
    closeEditModal: closeUpdateModal,
    closeViewModal: closeReadModal,
    toggler,
  };
};

export default useCloseModal;
