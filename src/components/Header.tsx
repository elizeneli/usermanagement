import { FC } from "react";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Logout from "./Logout";

const { Text } = Typography;

const Header: FC = () => {
  return (
    <div className="header">
      <div className="admin-dashboard-wrapper">
        <div className="admin-dashboard">
          <UserOutlined className="admin-icon" />
          <Text className="dashboard-title">Admin Dashboard</Text>
        </div>
        <div className="logout-icon">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Header;
