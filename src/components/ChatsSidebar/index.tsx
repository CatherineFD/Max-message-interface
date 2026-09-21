import { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Empty, Layout, Typography, Button } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import { chatsListStore } from '../../stores/ChatsListStore';
import { activeChatStore } from '../../stores/ActiveChatStore';
import { ChatListItem } from '../ChatListItem';
import styles from './ChatsSidebar.module.css';

const { Sider } = Layout;
const { Title } = Typography;

interface ChatsSidebarProps {
    openModal: boolean;
    handleOpenModal: (value: boolean) => void;
}

export const ChatsSidebar = observer(({ openModal, handleOpenModal }: ChatsSidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    
    const chats = chatsListStore.chatsList;
    const currentChatId = activeChatStore.currentChatId;
    const isLoading = chatsListStore.isLoading;

    const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);
    const toggleModal = useCallback(() => handleOpenModal(!openModal), [openModal, handleOpenModal]);
    const handleChatClick = useCallback((chatId: string) => {
        activeChatStore.openChat(chatId);
    }, []);

    return (
        <div className={styles.container}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={80}
                width={300}
                className={styles.sider}
            >
                {/* Header */}
                <div className={`${styles.sideHeader} ${collapsed ? styles.collapsed : ''}`}>
                    {!collapsed && (
                        <Title level={4} className={styles.title}>
                            Чаты
                        </Title>
                    )}

                    <Button
                        onClick={toggleModal}
                        icon={<PlusCircleOutlined />}
                        aria-label="Создать новый чат"
                        title="Создать новый чат"
                    />
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {isLoading ? (
                        <div className={styles.loadingWrapper}>
                            <Spin size="large" description="Загрузка чатов..." />
                        </div>
                    ) : chats.length === 0 ? (
                        <div className={styles.emptyWrapper}>
                            <Empty description="Список чатов пуст" />
                        </div>
                    ) : (
                        <div className={styles.chatsList}>
                            {chats.map(chat => (
                                <ChatListItem
                                    key={chat.chatId}
                                    chat={chat}
                                    isActive={chat.chatId === currentChatId}
                                    onClick={handleChatClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Sider>

            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapse}
                className={styles.sideBtn}
                aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
            />
        </div>
    );
});