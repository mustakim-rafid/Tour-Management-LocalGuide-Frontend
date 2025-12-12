import UpdateUserForm from "@/components/modules/profile/UpdateUserForm";
import { getMe } from "@/services/auth/getMe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserInfo } from "@/types/user.interface";

const MyProfilePage = async () => {
  const me = (await getMe()) as UserInfo;

  const roleData =
    me.role === "ADMIN"
      ? me.admin
      : me.role === "GUIDE"
      ? me.guide
      : me.tourist;

  return (
    <div className="w-full px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account details.
          </p>
        </div>

        {/* PROFILE CARD */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              {/* AVATAR */}
              <Avatar className="w-16 h-16">
                <AvatarImage src={roleData?.profilePhoto ?? ""} />
                <AvatarFallback>
                  {roleData?.name?.[0]?.toUpperCase() ??
                    me.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* USER DETAILS */}
              <div>
                <CardTitle>{roleData?.name ?? "User"}</CardTitle>

                <CardDescription>{me.email}</CardDescription>

                <Badge variant="secondary" className="mt-2">
                  {me.role}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <UpdateUserForm user={me} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfilePage;
