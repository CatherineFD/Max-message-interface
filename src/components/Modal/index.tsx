import { Modal as ModalAntd, type ModalProps } from 'antd';

function Modal(props: ModalProps) {
    const {
        children, ...rest
    } = props;

    return (
        <ModalAntd
            {...rest}
        >
            {children}
        </ModalAntd>
    );
}

export default Modal;