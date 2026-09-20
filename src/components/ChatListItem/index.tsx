import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Typography } from 'antd';
import { ChatModel } from '../../stores/ChatModel';
import './ChatListItem.css'; // стили ниже

interface ChatListItemProps {
    chat: ChatModel;
    isActive: boolean;
    onClick: (chatId: string) => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = observer(({ chat, isActive, onClick }) => {
    // Первая буква имени для фоллбека, если нет аватарки
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
                src={chat.avatar || undefined} 
                style={{ 
                    backgroundColor: chat.avatar ? 'transparent' : '#1890ff',
                    flexShrink: 0 // Запрещаем аватару сжиматься
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
                    
                    {/* Время последнего сообщения (добавьте это поле в модель, если есть) */}
                    {/* <Typography.Text type="secondary" className="chat-list-item__time">
                        {chat.lastMessageTime || ''} 
                    </Typography.Text> */}
                </div>

                <div className="chat-list-item__footer">
                    {/* Превью последнего сообщения */}
                    <Typography.Text type="secondary" ellipsis className="chat-list-item__preview">
                        {chat.lastMessagePreview || 'Нет сообщений'}
                    </Typography.Text>

                    {/* Бейдж непрочитанных сообщений */}
                    {/* {chat.unreadCount > 0 && (
                        <Badge 
                            count={chat.unreadCount} 
                            style={{ backgroundColor: '#52c41a' }}
                        />
                    )} */}
                </div>
            </div>
        </div>
    );
});