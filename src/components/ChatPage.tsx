import { observer } from "mobx-react-lite";
import { activeChatStore } from "../stores/ActiveChatStore";
import { Message } from "./Message";
import MessageInput from "./MessageInput";
import { Alert } from "antd";

export const ChatPage = observer(() => {
    const chat = activeChatStore.currentChat;

    if (!chat) return <div>Выберите чат</div>;

    return (
        <div>
            {activeChatStore.error && (
                <Alert
                    message={activeChatStore.error}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: 16 }}
                />
            )}
            <header>
                <h2>{chat.name}</h2>
                <span>Был в сети: {chat.lastSeen}</span> {/* lastSeen появится после loadChatInfo */}
            </header>
            
            <div className="messages">
                {chat.messages.map(msg => <Message key={msg.id} data={msg} />)}
            </div>

            <div>
                <MessageInput
                    loading={chat.isLoadingMessages}
                    onSendMessage={activeChatStore.sendMessage}
                />
            </div>
        </div>
    );
});