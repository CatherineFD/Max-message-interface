import { useState, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { ContactStore } from '../../stores/error/ContactStore';
import Modal from '../../components/Modal';
import PhoneInput from '../../components/Input/PhoneInput';
import { Typography } from 'antd';
import { ChatsSidebar } from '../../components/ChatsSidebar';
import { ChatPage as ChatPageComponent } from '../../components/ChatPage'

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
};

const ChatPage = observer(() => {
  const contactStore = useMemo(() => new ContactStore(), []);
  const [collapsed, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPhone, setCurrentPhone] = useState('');

  const handlePhoneInput = useCallback((value: string) => {
    setCurrentPhone(value);
  }, [setCurrentPhone]);

  const handleConfirm = useCallback(() => {
    setOpenModal(false);
    contactStore.checkAccount(Number(currentPhone));
  }, [setOpenModal, contactStore, currentPhone]);

  const handleCancel = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <>
        {/* <div
            style={{
                display: 'flex',
                position: 'relative',
            }}
        >
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
                                    color: '#fff',
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
                <div className="demo-logo-vertical" />
                <ul>
                    {
                        contactsList.map((elem) => {
                            return (
                            <div>{elem.contactName}</div> 
                            )
                        })
                    }
                </ul>
            </Sider>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
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

                {chatStore.error && (
                    <Alert
                    message={chatStore.error}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: 16 }}
                    />
                )}

                <Content
                    style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 16,
                    background: '#f5f5f5',
                    }}
                >
                    <MessageList
                        chatStore={chatStore}
                    />
                </Content>

                <Footer
                    style={{
                    padding: 16,
                    background: '#fff',
                    borderTop: '1px solid #f0f0f0',
                    }}
                >
                    <MessageInput
                        chatStore={chatStore}
                    />
                </Footer>
            </div>
        </div> */}

        <div>
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
                                    color: '#fff',
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

            <ChatPageComponent/>
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