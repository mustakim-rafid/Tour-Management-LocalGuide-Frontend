"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/services/user/user.service";
import { UserInfo } from "@/types/user.interface";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

const UpdateUserForm = ({ user }: { user: UserInfo }) => {
  const [state, formAction, pending] = useActionState(updateUser, null);
  const [_, startTransition] = useTransition()
  const router = useRouter()

  const role = user.role;

  const roleData =
    role === "ADMIN"
      ? user.admin
      : role === "GUIDE"
      ? user.guide
      : user.tourist;

  useEffect(() => {
    if (state && state.error && !state.success) {
      toast.error(state.message);
    }
    if (state && state.success) {
      toast.success(state.message);
      startTransition(() => {
        router.refresh()
      })
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        {/* Email */}
        <Field>
          <FieldLabel htmlFor="emailView">Email</FieldLabel>
          <Input
            id="emailView"
            type="email"
            value={user.email}
            disabled
            className="opacity-60"
          />
        </Field>

        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={
              state?.formData?.name ?? roleData?.name ?? ""
            }
            placeholder="Your name"
          />
          <InputFieldError field="name" state={state} />
        </Field>

        {/* Address */}
        {(role === "ADMIN" || role === "GUIDE" || role === "TOURIST") && (
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              defaultValue={
                state?.formData?.address ?? roleData?.address ?? ""
              }
              placeholder="Your address"
            />
            <InputFieldError field="address" state={state} />
          </Field>
        )}

        {/* Contact Number */}
        {(role === "ADMIN" || role === "GUIDE" || role === "TOURIST") && (
          <Field>
            <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="text"
              defaultValue={
                state?.formData?.contactNumber ??
                roleData?.contactNumber ??
                ""
              }
              placeholder="Your contact number"
            />
            <InputFieldError field="contactNumber" state={state} />
          </Field>
        )}

        {/* GUIDE ONLY FIELDS */}
        {role === "GUIDE" && (
          <>
            {/* Bio */}
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={
                  state?.formData?.bio ?? (roleData as any)?.bio ?? ""
                }
                placeholder="Short guide bio"
              />
              <InputFieldError field="bio" state={state} />
            </Field>

            {/* Experience Years */}
            <Field>
              <FieldLabel htmlFor="experienceYears">
                Experience Years
              </FieldLabel>
              <Input
                id="experienceYears"
                name="experienceYears"
                type="number"
                defaultValue={
                  state?.formData?.experienceYears ??
                  (roleData as any).experienceYears ??
                  0
                }
                placeholder="Years of experience"
                min={0}
              />
              <InputFieldError field="experienceYears" state={state} />
            </Field>
          </>
        )}

        {/* Submit */}
        <Field>
          <Button type="submit" disabled={pending} className="cursor-pointer">
            {pending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>

          <FieldDescription className="text-center mt-2">
            Changes will immediately reflect on your account.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default UpdateUserForm;
