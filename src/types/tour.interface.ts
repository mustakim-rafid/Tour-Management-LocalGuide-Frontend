import { BookingStatus, PaymentStatus } from "./booking.interface";

export interface ITour {
  id: string;
  title: string;
  description: string;
  tourFee: number;
  duration: string;
  meetingPoint: string;
  maxGroupSize: number;
  image: string;
  tourDate: Date;
  createdAt: Date;
  updatedAt: Date;
  guide?: {
    name: string;
    email: string;
    avrgRating: number;
    experienceYears: number;
    profilePhoto?: number;
    reviews?: {
      rating: number;
      comment: string;
      tourist: {
        name: string;
      };
    }[];
  };
  bookings?: {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    touristId?: string;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    tourId?: string;
    tourist: {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
      email: string;
      name: string;
      profilePhoto?: string | null;
      address?: string | null;
      contactNumber?: string | null;
      isDeleted?: boolean;
    };
  }[];
}
