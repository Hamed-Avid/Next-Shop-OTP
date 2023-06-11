"use client";

import Loading from "@/common/loading";
import { useGetAllUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

function UsersPage() {
  const { isLoading, data } = useGetAllUsers();
  const { users } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-800 mb-5">کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
