"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TourFormDialog from "./TourFormDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const TourHeader = () => {
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
        title="Tour management"
        description="Efficiently manage and organize your tour schedules for smooth coordination and tracking."
      >
        <TourFormDialog
          key={open ? "open" : "closed"}
          open={open}
          onOpenChange={setOpen}
          onSuccess={handleSuccess}
        />
      </ManagementPageHeader>
    </>
  );
};

export default TourHeader;
