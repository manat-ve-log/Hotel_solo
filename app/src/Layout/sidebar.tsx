import React from 'react';
import { Layout, Menu, theme, message } from 'antd';
import { LogoutOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const items = [
  { key: '1', icon: <UserOutlined />, label: 'nav 1', path: '/dashboard'  },
  { key: '2', icon: <VideoCameraOutlined />, label: 'nav 2', path: '/roomManagement'  },
  { key: '3', icon: <UploadOutlined />, label: 'nav 3' , path: '/user' },
];

const Sidebar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // ลบ token
    message.success('ออกจากระบบเรียบร้อย');
    navigate('/login'); // ไปหน้า login
    window.location.reload();
  };
  const handleMenuClick = (e: any) => {
    const clickedItem = items.find(item => item.key === e.key);
    if (clickedItem && clickedItem.path) {
      navigate(clickedItem.path);
    }
  };

  return (
    <div style={{height:'100vh'}}>
        <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ background: colorBgContainer }}
        >
        <div className="demo-logo-vertical"   />
            <div style={{width:'100%',height:'100px',background:"#050A44"}}>

            </div>
            <Menu
                theme="dark"
                mode="inline"
                style={{ height: "calc(100vh - 100px)",background:"#050A44" }}
                defaultSelectedKeys={['1']}
                items={[...items, {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: handleLogout,
                }]}
                onClick={handleMenuClick}
            />
        </Sider>

    </div>
    
  );
};

export default Sidebar;
