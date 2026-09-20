import { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Layout } from 'antd';
import Modal from '../../components/Modal';
import PhoneInput from '../../components/Input/PhoneInput';
import { Typography } from 'antd';
import { ChatsSidebar } from '../../components/ChatsSidebar';
import { Chat as ChatComponent } from '../../components/Chat';
import { chatsListStore } from '../../stores/ChatsListStore';

const { Title } = Typography;

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  background: '#c9d9e1',
};

const ChatPage = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPhone, setCurrentPhone] = useState('');

  const handlePhoneInput = useCallback((value: string) => {
    setCurrentPhone(value);
  }, [setCurrentPhone]);

  const handleConfirm = useCallback(() => {
    setOpenModal(false);
    chatsListStore.findChatByPhone(Number(currentPhone));
  }, [setOpenModal, currentPhone]);

  const handleCancel = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <>
        <div style={{
            display: 'flex',
        }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={siderStyle}
            >
                <div style={{
                    color: '#fff',
                    display: 'flex',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    alignItems: 'center',
                    padding: '5px',
                }}>
                    {
                        !collapsed && (
                            <Title
                                level={4}
                                style={{
                                    margin: 0
                                }}
                            >
                                Чаты    
                            </Title>
                        )
                    }
                    

                    <Button
                        onClick={() => setOpenModal(!openModal)}
                    >
                        <PlusCircleOutlined />
                    </Button>
                </div>
                <ChatsSidebar/>
            </Sider>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1000,
                    }}
                />

                <ChatComponent/>
            </div>
        </div>

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

export default ChatPage;