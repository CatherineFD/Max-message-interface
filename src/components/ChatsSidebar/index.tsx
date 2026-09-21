import React from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Empty } from 'antd';
import { chatsListStore } from '../../stores/ChatsListStore';
import { activeChatStore } from '../../stores/ActiveChatStore';
import { ChatListItem } from '../ChatListItem';

export const ChatsSidebar: React.FC = observer(() => {
    const chats = chatsListStore.chatsList;
    const currentChatId = activeChatStore.currentChatId;

    if (chatsListStore.isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                <Spin size="large" description="Загрузка чатов..." />
            </div>
        );
    }

    if (chats.length === 0) {
        return (
            <div style={{ padding: 40 }}>
                <Empty description="Список чатов пуст" />
            </div>
        );
    }

    return (
        <div className="chats-sidebar-container">
            {chats.map(chat => (
                <ChatListItem
                    key={chat.chatId}
                    chat={chat}
                    isActive={chat.chatId === currentChatId}
                    onClick={() => activeChatStore.openChat(chat.chatId)}
                />
            ))}
        </div>
    );
});