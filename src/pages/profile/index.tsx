import { useSession } from "next-auth/react";
import Logout from "../../components/Logout";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not logged in!</div>;
  }

  const userName = session.user?.name || "User";

  return (
    <div>
      <h1 className="welcomeMessage">Welcome to your profile, {userName}!</h1>
      <Logout />
    </div>
  );
};

export default ProfilePage;
