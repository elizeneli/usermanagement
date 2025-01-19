import { useRouter } from "next/router";
import { trpc } from "../utils/trpcHelper";

export default function Home() {
  const router = useRouter();

  // Fetch users from tRPC
  const { data: users, isLoading, error } = trpc.getUsers.useQuery();

  const handleAddUser = () => {
    router.push("/add-user");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Registered Users
      </h1>

      {isLoading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!isLoading && !error && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          {users?.length ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <p className="text-lg font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No users found.</p>
          )}
        </div>
      )}

      <button
        onClick={handleAddUser}
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Create new user
      </button>
    </div>
  );
}
