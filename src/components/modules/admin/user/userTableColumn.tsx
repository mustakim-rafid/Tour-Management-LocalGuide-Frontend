import { Column } from "@/components/shared/ManagementTable";
import { formatDate } from "@/lib/formatters";
import { UserInfo } from "@/types/user.interface";
import UserCell from "@/components/shared/UserCell";

const getUserProfile = (user: UserInfo) => {
  const profile = user.admin || user.guide || user.tourist;

  return {
    name: profile?.name || "Unknown",
    email: profile?.email || user.email,
    photoUrl: profile?.profilePhoto || undefined,
  };
};

export const userTableColumn: Column<UserInfo>[] = [
  {
    header: "User",
    accessor: (user) => {
      const { name, email, photoUrl } = getUserProfile(user);
      return <UserCell name={name} email={email} photoUrl={photoUrl} />;
    },
  },
  {
    header: "Role",
    accessor: (user) => user.role,
  },
  {
    header: "Status",
    accessor: (user) => user.status,
  },
  {
    header: "Created",
    accessor: (user) => formatDate(user.createdAt),
  },
];
