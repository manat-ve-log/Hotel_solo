import React from "react";
import { Form, Input, Button, message } from "antd";
import { authService } from "../../service/https/auth";
import { useNavigate } from "react-router-dom";


type LoginProps = {
  onLogin: (token: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const navigate = useNavigate();
  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const res = await authService.login(values.username, values.password);
      message.success("เข้าสู่ระบบสำเร็จ!");
      onLogin(res.token);  // อัพเดต token state ทันที
        navigate('/dashboard');
    } catch (err: any) {
      message.error(err.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}>
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
