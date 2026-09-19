import { observer } from "mobx-react-lite";
import { chatsListStore } from "../../stores/ChatsListStore";
import { activeChatStore } from "../../stores/ActiveChatStore";
import { useMemo } from "react";
import { Typography } from "antd";

const { Title } = Typography;

export const ChatsSidebar = observer(() => {
    const chats = chatsListStore.chatsList; 

    const isEmptyList = useMemo(() => chats.length === 0, [chats]);

    return (
        <div>
            {
                isEmptyList
                ? (
                    <Title
                        level={5}
                        style={{
                            color: '#fff',
                            margin: 0
                        }}
                    >
                        Список чатов пока пуст  
                    </Title>
                ) : (
                    chats.map(chat => (
                        <div key={chat.chatId} onClick={() => activeChatStore.openChat(chat.chatId)}>
                            <img src={chat.avatar} alt="avatar" />
                            <span>{chat.name}</span>
                        </div>
                    ))
                )
            }
        </div>
    );
});