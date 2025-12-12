"use client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/services/auth/logoutUser";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div>
      <Button
        className="cursor-pointer"
        variant={"destructive"}
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
