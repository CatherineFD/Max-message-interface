import { observer } from "mobx-react-lite";
import { activeChatStore } from "../../stores/ActiveChatStore";
import { Message } from "../Message";
import MessageInput from "../MessageInput";
import { Alert, Typography } from "antd";
import styles from './Chat.module.css';
import { messagesStore } from "../../stores/MessagesStore";

const { Title } = Typography;

export const Chat = observer(() => {
    const chat = activeChatStore.currentChat;

    const handleSendMessage = (message: string) => {
        activeChatStore.sendMessage(message)
    };

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
            {activeChatStore.error && (
                <Alert
                    title={activeChatStore.error}
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
                    <span>Был в сети: {chat.lastSeen}</span> {/* lastSeen появится после loadChatInfo */}
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