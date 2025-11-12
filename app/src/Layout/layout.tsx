import React from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './sidebar';
import './layout.css';
import Routers from '../routers/routers';

const { 
  // Header,
  Content,
  // Footer 
} = Layout;


const FullLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className='layout_container'>
      <Layout style={{height:'100vh'}}>
        <Sidebar />
        <Layout>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                height:'95%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routers/>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </div>
    
  );
};

export default FullLayout;
