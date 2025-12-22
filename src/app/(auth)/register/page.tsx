export const dynamic = "force-dynamic";

import RegisterForm from "@/components/modules/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guide – Register",
}

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="w-full max-w-2xl p-3">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
