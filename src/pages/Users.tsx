import { UsersTable } from "@/components/UsersTable";

export default function Users() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Manage your users with server-side filtering, sorting, and pagination powered by json-server.
        </p>
      </div>

      <UsersTable />
    </div>
  );
}
