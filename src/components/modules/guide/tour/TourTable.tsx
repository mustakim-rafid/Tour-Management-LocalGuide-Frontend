"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { ITour } from "@/types/tour.interface";
import React, { useState, useTransition } from "react";
import { tourTableColumn } from "./tourTableColumn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteTour } from "@/services/tour/tour.service";
import TourViewDetailsDialog from "./TourViewDetailsDialog";
import TourFormDialog from "./TourFormDialog";

interface TourTableProps {
  tourData: ITour[];
}

const TourTable = ({ tourData }: TourTableProps) => {
  const handleGetRowKey = (tour: ITour) => tour.id;
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const [tourViewDialogOpen, setTourViewDialogOpen] = useState(false);
  const [viewTour, setViewTour] = useState<ITour>();
  const [editTourDialogOpen, setEditTourDialogOpen] = useState(false)
  const [editTourInfo, setEditTourInfo] = useState<Partial<ITour>>({
    title: ""
  })

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDeleteTour = async (tour: ITour) => {
    const result = await deleteTour(tour.id);
    if (result.success) {
      toast.success(result.message);
      startTransition(() => {
        router.refresh();
      });
    } else {
      toast.error(result.message);
    }
  };

  const handleView = async (tour: ITour) => {
    setViewTour(tour)
    setTourViewDialogOpen(true)
  }

  const handleEdit = async (tour: ITour) => {
    setEditTourInfo(tour)
    setEditTourDialogOpen(true)
  }

  return (
    <>
      <ManagementTable
        data={tourData}
        columns={tourTableColumn}
        getRowKey={handleGetRowKey}
        onDelete={handleDeleteTour}
        onView={handleView}
        onEdit={handleEdit}
        emptyMessage="No tours found"
        deleteDes="This will permanently delete this tour"
      />

      <TourViewDetailsDialog
        open={tourViewDialogOpen}
        onOpenChange={setTourViewDialogOpen}
        tour={viewTour as ITour}
      />

      {/* Edit tour */}
      <TourFormDialog
          key={editTourDialogOpen ? "open" : "closed"}
          open={editTourDialogOpen}
          onOpenChange={setEditTourDialogOpen}
          onSuccess={handleSuccess}
          tour={editTourInfo}
        />
    </>
  );
};

export default TourTable;
