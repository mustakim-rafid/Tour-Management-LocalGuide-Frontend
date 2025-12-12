"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
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
import InputFieldError from "@/components/shared/InputFieldError";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import { createReview } from "@/services/review/review.service";

interface ReviewFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  onSuccess: () => void;
}

const ReviewFormDialog = ({
  open,
  onOpenChange,
  bookingId,
  onSuccess,
}: ReviewFormDialogProps) => {
  const [state, formAction, pending] = useActionState(createReview, null);
  const [rating, setRating] = useState(Number(state?.formData?.rating) || 0);

  useEffect(() => {
    if (state) {
      if (!state.success && state.error) {
        toast.error(state.message);
      }

      if (state.success) {
        toast.success("Thanks for your review!");
        onOpenChange(false);
        onSuccess();
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a Review for the guide</DialogTitle>
        </DialogHeader>

        <form id="reviewForm" action={formAction} className="space-y-5">
          {/* Hidden booking id */}
          <input type="hidden" name="bookingId" value={bookingId} />

          {/* ⭐ Rating */}
          <Field>
            <FieldLabel>Rating</FieldLabel>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className="group"
                >
                  <Star
                    className={`h-7 w-7 cursor-pointer transition-colors
                ${
                  rating >= num
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-400 group-hover:text-yellow-300"
                }`}
                  />
                </button>
              ))}
            </div>

            {/* Hidden input to submit the rating with form */}
            <input id="rating" name="rating" type="hidden" value={rating} />
            <InputFieldError field="rating" state={state} />
          </Field>

          {/* Comment */}
          <Field>
            <FieldLabel htmlFor="comment">Comment</FieldLabel>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Write your feedback..."
              rows={4}
              defaultValue={state?.formData?.comment || ""}
            />
            <InputFieldError field="comment" state={state} />
          </Field>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button
            form="reviewForm"
            type="submit"
            disabled={pending}
            className="cursor-pointer"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewFormDialog;
