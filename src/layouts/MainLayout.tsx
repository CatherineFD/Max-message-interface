import React from 'react';
import { WechatOutlined, SettingFilled } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

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

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout (props: MainLayoutProps) {
    const {
        children
    } = props;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentYear = new Date().getFullYear();

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
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{currentYear} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;