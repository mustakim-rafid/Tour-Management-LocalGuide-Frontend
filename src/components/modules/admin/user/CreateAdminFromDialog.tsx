"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createAdmin } from "@/services/user/user.service";
import { Loader2, Plus } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface AdminFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CreateAdminFormDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AdminFormDialogProps) => {
  const [state, formAction, pending] = useActionState(createAdmin, null);

  useEffect(() => {
    if (state) {
      if (!state.success && state.error) {
        toast.error(state.message);
      }

      if (state.success) {
        toast.success(state.message);
        onOpenChange(false);
        onSuccess();
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer dark:hover:text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
        </DialogHeader>

        <form id="adminForm" action={formAction} className="space-y-5">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Admin name"
              defaultValue={state?.formData?.name || ""}
            />
            <InputFieldError field="name" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              placeholder="Email address"
              defaultValue={state?.formData?.email || ""}
            />
            <InputFieldError field="email" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <InputFieldError field="password" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button
            form="adminForm"
            type="submit"
            className="cursor-pointer"
            disabled={pending}
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminFormDialog;
