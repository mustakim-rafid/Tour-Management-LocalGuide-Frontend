export const dynamic = "force-dynamic";

import LoginForm from "@/components/modules/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guide – Login",
}

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirect: string }>;
}) => {
  const params = await searchParams;
  const { redirect } = params;

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-3 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Enter your email and password below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm redirect={redirect || ""} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
