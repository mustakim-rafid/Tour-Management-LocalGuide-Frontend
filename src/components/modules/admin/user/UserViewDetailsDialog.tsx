"use client";

import { UserInfo } from "@/types/user.interface";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Info,
  ImageIcon,
  Star,
} from "lucide-react";
import InfoRow from "@/components/shared/InfoRow";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

interface UserViewDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserInfo;
}

const UserViewDetailsDialog = ({
  open,
  onOpenChange,
  user,
}: UserViewDetailsDialogProps) => {
  if (!user) return null;

  const profile = user.admin || user.guide || user.tourist;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-full 
          max-w-3xl 
          max-h-[90vh] 
          flex 
          flex-col 
          p-0 
          sm:rounded-lg
          px-1
        "
      >
        <DialogHeader className="px-4 sm:px-6 pt-6 pb-4">
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 space-y-6">
          {/* Header */}
          <div
            className="
              flex
              flex-col
              items-center
              gap-4
              py-6
              from-blue-50 to-purple-50
              dark:from-blue-950 dark:to-purple-950
              rounded-lg
            "
          >
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-muted">
              {profile?.profilePhoto ? (
                <Image
                  src={profile.profilePhoto}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold">{profile?.name ?? "Unknown User"}</h2>
              <p className="text-sm text-muted-foreground">{profile?.email ?? user.email}</p>

              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge>{user.role}</Badge>
                <Badge variant="secondary">{user.status}</Badge>
              </div>
            </div>
          </div>

          {/* General Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-lg">General Information</h3>
            </div>

            <div
              className="
                grid 
                grid-cols-1 
                md:grid-cols-2 
                gap-4 
                bg-muted/50 
                p-4 
                rounded-lg
              "
            >
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Email" value={profile?.email || user.email} />
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Role" value={user.role} />
              </div>

              <div className="flex items-start gap-3">
                <User className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Status" value={user.status} />
              </div>

              {profile?.contactNumber && (
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Phone" value={profile.contactNumber} />
                </div>
              )}

              {profile?.address && (
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Address" value={profile.address} />
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Guide Specific Info */}
          {user.role === "GUIDE" && user.guide && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-lg">Guide Information</h3>
              </div>

              <div
                className="
                  grid 
                  grid-cols-1 
                  md:grid-cols-2 
                  gap-4 
                  bg-muted/50 
                  p-4 
                  rounded-lg
                "
              >
                {user.guide.bio && (
                  <InfoRow label="Bio" value={user.guide.bio} />
                )}

                <InfoRow
                  label="Experience"
                  value={`${user.guide.experienceYears} Years`}
                />

                <InfoRow
                  label="Rating"
                  value={`${user.guide.avrgRating || 0} ⭐`}
                />
              </div>
            </div>
          )}

          <Separator />

          {/* System Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-lg">System Information</h3>
            </div>

            <div
              className="
                grid 
                grid-cols-1 
                md:grid-cols-2 
                gap-4 
                bg-muted/50 
                p-4 
                rounded-lg
              "
            >
              <InfoRow label="Created On" value={formatDate(user.createdAt)} />
              <InfoRow label="Updated On" value={formatDate(user.updatedAt)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDetailsDialog;
