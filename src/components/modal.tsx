import { createContext, FunctionComponent, useState } from "react";
import ReactModal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "./button";
import "./modal.scss";

ReactModal.setAppElement("#root");

interface ModalUtilities {
    readonly closeModal: VoidFunction;
    readonly openModal: VoidFunction;
    readonly isOpen: boolean;
    readonly canClose: boolean;
}

interface UseModalConfiguration {
    readonly canClose?: boolean;
    readonly isOpen?: boolean;
}

/**
 * A hook that is used to supply the Modal component with the props it needs. It also allows the user to use the modal
 * utilities in the same comopnent that the Modal is rendered in. E.g you can open/close the modal.
 * @returns Modal utilitites that will be passed as props to the Modal component.
 */
export const useModal = ({
    canClose = true,
    isOpen: initialIsOpen = false,
}: UseModalConfiguration = {}): ModalUtilities => {
    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        closeModal,
        openModal,
        isOpen,
        canClose,
    };
};

const defaultContext: ModalUtilities = {
    canClose: true,
    closeModal: () => {},
    isOpen: false,
    openModal: () => {},
};

export const ModalContext = createContext(defaultContext);

/**
 * A component that will display its children in a modal.
 * @param props.children       The content of the modal.
 * @param props.modalUtilities Utilities for interacting with the modal.
 */
const Modal: FunctionComponent<ModalUtilities> = ({ children, ...modalUtilities }) => {
    const { canClose, closeModal, isOpen } = modalUtilities;
    return (
        <ReactModal
            className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName="modal__overlay"
            shouldCloseOnEsc={canClose}
            shouldCloseOnOverlayClick={canClose}
        >
            {/* Wrap the children in a context provider so that all modal content can use the modal utilities. */}
            <ModalContext.Provider value={modalUtilities}>{children}</ModalContext.Provider>
            {canClose && (
                <Button className="modal__close-button" onClick={closeModal}>
                    <AiOutlineCloseCircle size="18px" />
                </Button>
            )}
        </ReactModal>
    );
};

export default Modal;
