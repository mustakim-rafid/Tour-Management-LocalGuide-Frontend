import UserManagementHeader from "@/components/modules/admin/user/UserManagementHeader";
import UserManagementTable from "@/components/modules/admin/user/UserManagementTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { formatQueryParams } from "@/lib/formatters";
import { getAllUsers } from "@/services/user/user.service";

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObj = await searchParams;
  const queryString = formatQueryParams(queryParamsObj);

  const users = await getAllUsers(queryString);

  const { limit, total, page } = users.meta;

  const totalPages = Math.ceil(total / limit);

  const userRoles: { label: string; value: string }[] = [
    { label: "Admin", value: "ADMIN" },
    { label: "Guide", value: "GUIDE" },
    { label: "Tourist", value: "TOURIST" },
  ];

  const userStatuses: { label: string; value: string }[] = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Deleted", value: "DELETED" },
  ];

  return (
    <div className="p-4 space-y-6">
      <UserManagementHeader />
      <div className="flex gap-5">
        <SearchFilter />
        <SelectFilter
          paramName="role"
          placeholder="Role"
          options={userRoles.map((role) => ({
            label: role.label,
            value: role.value,
          }))}
        />
        <SelectFilter
          paramName="status"
          placeholder="Status"
          options={userStatuses.map((status) => ({
            label: status.label,
            value: status.value,
          }))}
        />
        <RefreshButton />
      </div>
      <UserManagementTable userData={users.data} />
      <TablePagination totalPages={totalPages || 1} currentPage={page || 1} />
    </div>
  );
};

export default UserManagementPage;
