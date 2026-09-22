import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Typography, Modal } from 'antd';
import ChatsListStore  from './store';
import PhoneInput from '../../components/Base/Input/PhoneInput';
import { ChatsSidebar } from './components/ChatsSidebar';

const { Title } = Typography;


export const ChatsList = observer(() => {
    const [openModal, setOpenModal] = useState(false);
    const [currentPhone, setCurrentPhone] = useState('');
    const navigate = useNavigate();

    const chatsListStore = useMemo(() =>  new ChatsListStore(), []);

    const chats = chatsListStore.chatsList;
    const isLoading = chatsListStore.isLoading;
    const activeChatId = chatsListStore.activeChatId;
    
    const handlePhoneInput = useCallback((value: string) => {
    setCurrentPhone(value);
    }, [setCurrentPhone]);

    const handleConfirm = useCallback(async () => {
        setOpenModal(false);
        const chatId = await chatsListStore.findChatByPhone(Number(currentPhone));

        if (chatId) {
            chatsListStore.setActiveChat(chatId);
            navigate(`/${chatId}`);
        }
    }, [setOpenModal, currentPhone, chatsListStore, navigate]);

    const handleCancel = useCallback(() => {
    setOpenModal(false);
    }, [setOpenModal]);

    const handleOpenChat = useCallback((chatId: string) => {
        chatsListStore.setActiveChat(chatId);
        navigate(`/${chatId}`);
    }, [navigate, chatsListStore]);

    return (
        <>
            <ChatsSidebar
                openModal={openModal}
                handleOpenModal={setOpenModal}
                chats={chats}
                isLoading={isLoading}
                activeChatId={activeChatId}
                handleOpenChat={handleOpenChat}
            />

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