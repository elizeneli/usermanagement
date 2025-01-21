import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpcHelper";
import { useEffect } from "react";
import { Form, Input, Button, Spin, message } from "antd"; // Ant Design components
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"; // Ant Design icons
import { useUserStore } from "../../../store/userStore"; // Zustand store

interface FormData {
  name: string;
  email: string;
  password?: string;
}

const EditUserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetching user data via TRPC
  const {
    data: userData,
    isLoading,
    error,
  } = trpc.getUser.useQuery(Number(id));

  // Zustand user store state
  const { user, setUser } = useUserStore((state) => state);

  const updateUserMutation = trpc.updateUser.useMutation();

  // When user data is fetched, store it in Zustand state
  useEffect(() => {
    if (userData) {
      setUser({ id: userData.id, name: userData.name, email: userData.email });
    }
  }, [userData, setUser]);

  const handleSubmit = async (values: FormData) => {
    const { name, email, password } = values;

    // Prepare updated data
    const updatedData = {
      name,
      email,
      password: password || undefined, // Only update password if provided
    };

    try {
      await updateUserMutation.mutateAsync({
        id: Number(id),
        ...updatedData,
      });
      message.success("User updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user.");
    }
  };

  if (isLoading) return <Spin size="large" className="loadingSpinner" />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="editUserWrapper">
      <h1 className="editUserTitle">Edit User</h1>

      <Form
        initialValues={{ name: user?.name, email: user?.email }}
        layout="vertical"
        onFinish={handleSubmit}
        className="editUserForm"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the user's name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter user's name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the user's email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter user's email" />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter a new password (optional)"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={updateUserMutation.isLoading}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUserPage;
