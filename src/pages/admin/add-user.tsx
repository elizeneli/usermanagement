import { useState } from "react";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  Button,
  Radio,
  Typography,
  notification,
  RadioChangeEvent,
} from "antd";

const { Title } = Typography;

function AddUser() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "USER",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: RadioChangeEvent) => {
    setFormData((prev) => ({ ...prev, role: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        notification.success({
          message: "User Added",
          description: "The user has been added successfully.",
          placement: "topRight",
        });
        router.push("/admin");
      } else {
        const error = await response.json();
        notification.error({
          message: "Error",
          description: error.error || "An error occurred. Please try again.",
          placement: "topRight",
        });
      }
    } catch {
      notification.error({
        message: "Error",
        description: "An error occurred. Please try again.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="addNewUserContainer">
      <div className="addNewUserForm">
        <Title level={3} className="addNewUserTitle">
          Add New User
        </Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <table className="form-table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <Input
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </td>
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </td>
              </tr>

              <tr>
                <td>Password</td>
                <td>
                  <Input.Password
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                  />
                </td>
              </tr>

              <tr>
                <td>Role</td>
                <td>
                  <Radio.Group
                    onChange={handleRoleChange}
                    value={formData.role}
                    className="radio-group"
                  >
                    <Radio value="USER">User</Radio>
                    <Radio value="ADMIN">Admin</Radio>
                  </Radio.Group>
                </td>
              </tr>
            </tbody>
          </table>

          <Button type="primary" htmlType="submit" className="submit-btn">
            Add User
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddUser;
