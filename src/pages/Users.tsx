import UserList from "@/components/UserList";

export default function Users() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="mt-2 text-gray-600">
          Manage your users with React Query powered data fetching and caching.
        </p>
      </div>

      <UserList />
    </div>
  );
}
