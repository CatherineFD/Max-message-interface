import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Typography } from 'antd';
import './ChatListItem.css';
import type { ContactsList } from '../../../../types/contact';

interface ChatListItemProps {
    chat: ContactsList;
    isActive: boolean;
    onClick: (chatId: string) => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = observer(({ chat, isActive, onClick }) => {
    const fallbackName = chat.name || chat.contactName || '?';
    const initial = fallbackName.charAt(0).toUpperCase();

    return (
        <div 
            className={`chat-list-item ${isActive ? 'active' : ''}`}
            onClick={() => onClick(chat.chatId)}
        >
            {/* Аватар */}
            <Avatar 
                size={48} 
                src={undefined} 
                style={{ 
                    backgroundColor: '#1890ff',
                    flexShrink: 0
                }}
            >
                {initial}
            </Avatar>

            {/* Центральная часть: Имя и последнее сообщение */}
            <div className="chat-list-item__content">
                <div className="chat-list-item__header">
                    <Typography.Text strong ellipsis className="chat-list-item__name">
                        {chat.name || chat.contactName || 'Неизвестный контакт'}
                    </Typography.Text>
                </div>

                <div className="chat-list-item__footer">
                    <Typography.Text type="secondary" ellipsis className="chat-list-item__preview">
                        {'Нет сообщений'}
                    </Typography.Text>
                </div>
            </div>
        </div>
    );
});