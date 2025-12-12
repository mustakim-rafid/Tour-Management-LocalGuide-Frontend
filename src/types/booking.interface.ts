export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type PaymentStatus = "PAID" | "UNPAID";

export interface IBooking {
    id: string;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    tourId: string;
    touristId: string;
    tour: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        tourFee: number;
        duration: string;
        meetingPoint: string;
        maxGroupSize: number;
        image: string;
        tourDate: Date;
        guideId: string;
        guide?: {
            email: string;
            name: string;
            profilePhoto: string | null;
            experienceYears: number;
            avrgRating: number;
        }
    }
}