import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { LogoutOutlined } from "@ant-design/icons";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="logoutWrapper">
      <LogoutOutlined onClick={handleLogout} className="logoutButton" />
    </div>
  );
};

export default Logout;
