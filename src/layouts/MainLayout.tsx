import React from 'react';
import { Layout, theme } from 'antd';

const { Header, Content } = Layout;

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