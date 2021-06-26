import { createContext, FunctionComponent, useState } from "react";
import ReactModal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./modal.scss";
import Button from "./button";

// Could I also incorporate react context somehow to give modal children access to props and utiltity functions?
// Maybe I could have a separate hook that doesn't include props.

interface ModalUtilitites {
    readonly closeModal: VoidFunction;
    readonly openModal: VoidFunction;
}

interface ReactModalProps {
    readonly props: ReactModal.Props;
}

type ModalProps = ModalUtilitites & ReactModalProps;

export const useModal = (): ModalProps => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        closeModal,
        openModal,
        props: { isOpen, shouldCloseOnEsc: true, shouldCloseOnOverlayClick: true },
    };
};

const defaultContext: ModalUtilitites = {
    closeModal: () => {},
    openModal: () => {},
};

export const ModalContext = createContext(defaultContext);

ReactModal.setAppElement("#root");
// interface ModalProps extends ReactModal.Props {}

const Modal: FunctionComponent<ModalProps> = ({ props, ...modalUtilities }) => {
    const { closeModal, children } = modalUtilities;
    return (
        <ReactModal className="modal" onRequestClose={closeModal} overlayClassName="modal__overlay" {...props}>
            <ModalContext.Provider value={modalUtilities}>
                {children}
                <Button className="modal__close-button" onClick={closeModal}>
                    <AiOutlineCloseCircle size="18px" />
                </Button>
            </ModalContext.Provider>
        </ReactModal>
    );
};

// I could definte types for this component so that they're the same as ReactModal and then wrap a context provider
// around it.
export default Modal;
