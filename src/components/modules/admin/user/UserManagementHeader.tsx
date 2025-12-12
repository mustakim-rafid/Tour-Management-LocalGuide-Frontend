"use client";

import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react'
import CreateAdminFormDialog from './CreateAdminFromDialog';

const UserManagementHeader = () => {
  const [open, setOpen] = useState(false);
    const [_, startTransition] = useTransition();
    const router = useRouter();
  
    const handleSuccess = () => {
      startTransition(() => {
        router.refresh();
      });
    };
  
    return (
      <>
        <ManagementPageHeader
          title="User management"
          description="Efficiently manage and organize users to ensure smooth access control and streamlined administration."
        >
          <CreateAdminFormDialog
            key={open ? "open" : "closed"}
            open={open}
            onOpenChange={setOpen}
            onSuccess={handleSuccess}
          />
        </ManagementPageHeader>
      </>
    );
}

export default UserManagementHeader