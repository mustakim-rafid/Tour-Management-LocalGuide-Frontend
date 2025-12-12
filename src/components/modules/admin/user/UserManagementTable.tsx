"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";
import React, { useState, useTransition } from "react";
import { userTableColumn } from "./userTableColumn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { softDelete } from "@/services/user/user.service";
import UserViewDetailsDialog from "./UserViewDetailsDialog";

interface UserManagementTableProps {
  userData: UserInfo[];
}

const UserManagementTable = ({ userData }: UserManagementTableProps) => {
  const handleGetRowKey = (user: UserInfo) => user.id;

  const [_, startTransition] = useTransition();
  const router = useRouter();

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewUser, setViewUser] = useState<UserInfo>();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDeleteUser = async (user: UserInfo) => {
    const result = await softDelete(user.id);

    if (result.success) {
      toast.success(result.message);
      handleSuccess();
    } else {
      toast.error(result.message);
    }
  };

  const handleView = (user: UserInfo) => {
    setViewUser(user);
    setViewDialogOpen(true);
  };

  return (
    <>
      <ManagementTable
        data={userData}
        columns={userTableColumn}
        getRowKey={handleGetRowKey}
        onDelete={handleDeleteUser}
        onView={handleView}
        emptyMessage="No users found"
        deleteDes="This will delete this user"
      />

      <UserViewDetailsDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        user={viewUser as UserInfo}
      />
    </>
  );
};

export default UserManagementTable;
