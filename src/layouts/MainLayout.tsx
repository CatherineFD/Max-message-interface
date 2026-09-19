import React from 'react';
import { Layout, theme } from 'antd';

const { Header, Content } = Layout;

// const items = [WechatOutlined, SettingFilled].map(
//   (icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//   }),
// );

// const siderStyle: React.CSSProperties = {
//   overflow: 'auto',
//   height: '100vh',
//   position: 'sticky',
//   insetInlineStart: 0,
//   top: 0,
//   scrollbarWidth: 'thin',
//   scrollbarGutter: 'stable',
// };

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

  return (
    <Layout>
       {/* <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider> */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
            style={{
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

export default MainLayout;