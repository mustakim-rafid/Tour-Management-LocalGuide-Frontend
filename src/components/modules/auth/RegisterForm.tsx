"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { register } from "@/services/auth/register";
import InputFieldError from "@/components/shared/InputFieldError";
import Image from "next/image";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterForm = () => {
  const [state, formAction, pending] = useActionState(register, null);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const profilePhotoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("")

  useEffect(() => {
    if (state) {
      if (!state?.success && state.errors) {
        if (profilePhoto && profilePhotoInputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(profilePhoto);
          profilePhotoInputRef.current.files = dataTransfer.files;
        }
      }
      if (state.error && !state.success) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
            <FieldLabel htmlFor="role">Select one</FieldLabel>
            <Select onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Register as" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input id="role" name="role" type="hidden" value={selectedRole} />
            <InputFieldError field="role" state={state} />
          </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">     
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="Your name" defaultValue={state?.formData?.name || ""} />
            <InputFieldError field="name" state={state} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={state?.formData?.email || ""}
            />
            <InputFieldError field="email" state={state} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeIcon size={18} />
                ) : (
                  <EyeOffIcon size={18} />
                )}
              </button>
            </div>
            <InputFieldError field="password" state={state} />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="******"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeIcon size={18} />
                ) : (
                  <EyeOffIcon size={18} />
                )}
              </button>
            </div>
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="profilePhoto">Profile photo</FieldLabel>
            <Input
              ref={profilePhotoInputRef}
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfilePhoto(file);
                }
                profilePhotoInputRef.current?.setAttribute;
              }}
            />
            {profilePhoto && (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(profilePhoto)}
                  alt="Preview"
                  height={100}
                  width={100}
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </Field>
          <Field>
            <Button type="submit" disabled={pending} className="cursor-pointer">
              {pending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/login">Sign in</Link>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <Link href="/">Back to home</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
