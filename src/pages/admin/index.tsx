import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpcHelper";
import { Modal, Table, Button, notification } from "antd";
import Header from "../../components/Header";

export default function AdminDashboard() {
  const router = useRouter();
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = trpc.getUsers.useQuery();

  const deleteUserMutation = trpc.deleteUser.useMutation({
    onSuccess: () => {
      refetch();

      notification.success({
        message: "User Deleted",
        description: "The user has been successfully deleted.",
        placement: "topRight",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Error",
        description: error.message,
        placement: "topRight",
      });
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleAddUser = () => {
    router.push("/admin/add-user");
  };

  const handleEditUser = (userId: number) => {
    router.push(`/admin/edit-user/${userId}`);
  };

  const showDeleteModal = (user: { id: number; name: string }) => {
    setUserToDelete(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete.id);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (
        _: unknown,
        user: { id: number; name: string; email: string }
      ) => (
        <div>
          <Button onClick={() => handleEditUser(user.id)} type="link">
            Edit
          </Button>
          <Button
            onClick={() => showDeleteModal(user)} // Show modal on click
            type="link"
            danger
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <Header />

      {isLoading && <p>Loading users...</p>}
      {error && <p>Error: {error.message}</p>}

      {!isLoading && !error && (
        <div className="usersTable">
          {users.length ? (
            <Table
              dataSource={users}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}

      <div>
        <Button
          onClick={handleAddUser}
          type="primary"
          className="createNewUser"
        >
          Create New User
        </Button>
      </div>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="Cancel"
        footer={[
          <Button key="cancel" onClick={handleCancel} className="cancel-btn">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleDeleteUser}
            className="submit-btn"
          >
            Yes
          </Button>,
        ]}
      >
        {userToDelete && (
          <p>
            Are you sure you want to delete <strong>{userToDelete.name}</strong>
            ?
          </p>
        )}
      </Modal>
    </div>
  );
}
