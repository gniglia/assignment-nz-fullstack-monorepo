import { useState } from "react";
import { UsersTable } from "@/components/UsersTable";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);

  // For now, we'll assume we have 1 page since we only have 5 users in the mock data
  // In a real app, you'd get this from the API response
  const totalPages = 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Manage your users with React Query powered data fetching and caching.
        </p>
      </div>

      <UsersTable
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
