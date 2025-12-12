"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { createTour, editTour } from "@/services/tour/tour.service";
import { ITour } from "@/types/tour.interface";
import { format } from "date-fns";
import { Loader2, Plus, ImageIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface TourFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  tour?: Partial<ITour>;
}

const TourFormDialog = ({
  open,
  onOpenChange,
  onSuccess,
  tour,
}: TourFormDialogProps) => {
  const isEdit = !!tour;

  const [image, setImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [tourDate, setTourDate] = useState<Date | null>(isEdit ? tour.tourDate as Date : null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const [state, formAction, pending] = useActionState(
    isEdit ? editTour.bind(null, tour.id!) : createTour,
    null
  );

  useEffect(() => {
    if (state) {
      if (!state?.success && state.errors) {
        if (image && imageInputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(image);
          imageInputRef.current.files = dataTransfer.files;
        }
      }

      if (!state.success && state.error) {
        toast.error(state.message);
      }

      if (state.success && state.data) {
        toast.success(state.message);
        onOpenChange(false);
        onSuccess();
      }
    }
  }, [state, image]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="cursor-pointer dark:hover:text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Tour
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {isEdit ? (
            <DialogTitle>Edit Tour</DialogTitle>
          ) : (
            <DialogTitle>Add Tour</DialogTitle>
          )}
        </DialogHeader>

        <form id="tourForm" action={formAction} className="space-y-5">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="Tour title"
              defaultValue={
                state?.formData?.title || (isEdit ? tour.title : "")
              }
            />
            <InputFieldError field="title" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Tour description"
              defaultValue={
                state?.formData?.description || (isEdit ? tour.description : "")
              }
            />
            <InputFieldError field="description" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="tourFee">Tour Fee</FieldLabel>
            <Input
              id="tourFee"
              name="tourFee"
              type="number"
              placeholder="e.g. 1200"
              defaultValue={
                state?.formData?.tourFee || (isEdit ? tour.tourFee : "")
              }
            />
            <InputFieldError field="tourFee" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="duration">Duration</FieldLabel>
            <Input
              id="duration"
              name="duration"
              placeholder="e.g. 3 days, 5 hours"
              defaultValue={
                state?.formData?.duration || (isEdit ? tour.duration : "")
              }
            />
            <InputFieldError field="duration" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
            <Input
              id="meetingPoint"
              name="meetingPoint"
              placeholder="e.g. City Center"
              defaultValue={
                state?.formData?.meetingPoint ||
                (isEdit ? tour.meetingPoint : "")
              }
            />
            <InputFieldError field="meetingPoint" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="maxGroupSize">Max Group Size</FieldLabel>
            <Input
              id="maxGroupSize"
              name="maxGroupSize"
              type="number"
              placeholder="e.g. 15"
              defaultValue={
                state?.formData?.maxGroupSize ||
                (isEdit ? tour.maxGroupSize : "")
              }
            />
            <InputFieldError field="maxGroupSize" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="tourDate">Tour Date</FieldLabel>
            <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-between w-full dark:hover:text-gray-300"
                >
                  {tourDate ? format(tourDate, "PPP") : "Select start date"}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Calendar
                  mode="single"
                  selected={isEdit ? tour.tourDate : (tourDate || undefined)}
                  onSelect={(date) => {
                    setTourDate(date as Date);
                    setOpenCalendar(false);
                  }}
                  captionLayout="dropdown"
                  disabled={(date) => date <= new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="tourDate"
              value={tourDate ? format(tourDate, "yyyy-MM-dd") : ""}
            />
            <InputFieldError field="tourDate" state={state} />
          </Field>

          {!isEdit && (
            <Field>
              <FieldLabel htmlFor="image">Tour Image</FieldLabel>
              <Input
                ref={imageInputRef}
                id="image"
                name="image"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImage(file);
                }}
              />

              {image && (
                <div className="mt-2">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    height={120}
                    width={200}
                    className="rounded-md object-cover"
                  />
                </div>
              )}

              <InputFieldError field="image" state={state} />
            </Field>
          )}
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button
            form="tourForm"
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

export default TourFormDialog;
