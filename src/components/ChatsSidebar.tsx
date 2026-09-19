import { observer } from "mobx-react-lite";
import { chatsListStore } from "../stores/ChatsListStore";
import { activeChatStore } from "../stores/ActiveChatStore";

export const ChatsSidebar = observer(() => {
    const chats = chatsListStore.chatsList; 

    return (
        <div>
            {chats.map(chat => (
                <div key={chat.chatId} onClick={() => activeChatStore.openChat(chat.chatId)}>
                    <img src={chat.avatar} alt="avatar" />
                    <span>{chat.name}</span>
                </div>
            ))}
        </div>
    );
});