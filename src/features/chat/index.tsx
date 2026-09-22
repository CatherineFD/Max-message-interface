import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Alert, Typography } from "antd";
import { Message } from "./components/Message";
import MessageInput from "./components/MessageInput";
import ChatStore from './store';

import styles from './styles.module.css';
import { messagesStore } from "../../shared/stores/Messages";
import { useEffect, useMemo } from "react";


const { Title } = Typography;

export const Chat = observer(() => {
    const { chatId } = useParams<{ chatId: string }>();
    const store = useMemo(() => new ChatStore(), []);
    const chat = store.currentChat;

    const handleSendMessage = (message: string) => {
        store.sendMessage(message)
    };

    useEffect(() => {
        if (!chatId) {
        store.clearChat();
        return;
        }

        store.loadChat(chatId);

        return () => {
        store.clearChat();
        };
    }, [chatId, store]);

    if (!chat) return (
        <div style={{
            minHeight: '100px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Title
                level={5}
                style={{
                    margin: 0
                }}
            >Выберите чат
            </Title>
        </div>
    );

    const messages = messagesStore.getMessages(chat.chatId);

    return (
        <div className={styles.chatBackground}>
            {store.error && (
                <Alert
                    title={store.error}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: 16 }}
                />
            )}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column', 
                    flex: 1, 
                    minHeight: 0,
                }}
            >
                <header
                    className={styles.chatHeader}
                >
                    <h2>{chat.name}</h2>
                    <span>Был в сети: {chat.lastSeen}</span>
                </header>
                
                <div
                    style={{
                        height: '100%',
                        flex: 1,
                        overflowY: 'auto',
                        minHeight: 0,
                    }}
                >
                    {messages.map(msg => <Message key={msg.id} data={msg} />)}
                </div>
            </div>


            <MessageInput
                loading={chat.isLoadingMessages}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
});