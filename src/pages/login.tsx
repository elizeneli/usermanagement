import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Form, Input, Button, Typography, notification } from "antd";

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.replace("/");
    } else {
      notification.error({
        message: "Invalid credentials",
        description: "The email or password you entered is incorrect.",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Title className="login-title">Login</Title>
        <Form
          onFinish={handleLogin}
          layout="vertical"
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input type="email" placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
