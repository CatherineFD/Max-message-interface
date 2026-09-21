import { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from 'antd';
import PhoneInput from '../../components/Base/Input/PhoneInput';
import { Typography } from 'antd';
import { ChatsSidebar } from '../../components/ChatsSidebar';
import { Chat as ChatComponent } from '../../components/Chat';
import { chatsListStore } from '../../stores/ChatsListStore';
import styles from './ChatPage.module.css';

const { Title } = Typography;


const ChatPage = observer(() => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPhone, setCurrentPhone] = useState('');

  const handlePhoneInput = useCallback((value: string) => {
    setCurrentPhone(value);
  }, [setCurrentPhone]);

  const handleConfirm = useCallback(() => {
    setOpenModal(false);
    chatsListStore.findChatByPhone(Number(currentPhone));
  }, [setOpenModal, currentPhone]);

  const handleCancel = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <>
        <div className={
            styles.container
        }>
            <ChatsSidebar
                openModal={openModal}
                handleOpenModal={setOpenModal}
            />

            <ChatComponent/>
        </div>

        <Modal
            open={openModal}
            onOk={handleConfirm}
            onCancel={handleCancel}
        >
            <Title level={4}>
                Найти по номеру
            </Title>
            
            <PhoneInput
                value={currentPhone}
                onChange={handlePhoneInput}
            />
        </Modal>
    </>
  );
});

export default ChatPage;