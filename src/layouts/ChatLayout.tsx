import React from 'react';
import { WechatOutlined, SettingFilled } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

const items = [WechatOutlined, SettingFilled].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

interface ChatLayoutProps {
    children: React.ReactNode;
}

function ChatLayout (props: ChatLayoutProps) {
    const {
        children
    } = props;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
       <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatLayout;