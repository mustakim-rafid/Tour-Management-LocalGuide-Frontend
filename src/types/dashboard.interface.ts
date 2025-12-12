import { BookingStatus, PaymentStatus } from "./booking.interface";

export interface INavItem {
  title: string;
  url: string;
}

export interface INavMain {
  title: string;
  icon: string;
  isActive: boolean;
  items: INavItem[];
}

export interface IUpcomingTour {
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
  guide: {
    email: string;
    name: string;
  };
}

export interface IRecentBooking {
  id: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  tourId: string;
  touristId: string;

  tour: {
    title: string;
    tourDate: Date;
  };

  tourist: {
    email: string;
    name: string;
  };
}

export interface IGuideDashboardInfo {
  upcomingTours: any[];
  rating: number;
  latestReviews: any[];
  completedTours: number;
}

export interface ITouristDashboardInfo {
  upcomingBookings: {
    id: string;
    status: string;
    paymentStatus: string;
    tour: {
      id: string;
      title: string;
      tourDate: Date;
      guide: { name: string };
    };
  }[];
  completedTours: {
    id: string;
    status: string;
    tour: {
      id: string;
      title: string;
      tourDate: Date;
      guide: { name: string };
    };
  }[];
  pendingPayments: {
    id: string;
    paymentStatus: string;
    tour: { id: string; title: string; tourDate: Date };
  }[];
  recentBookings: {
    id: string;
    status: string;
    paymentStatus: string;
    tour: { id: string; title: string; tourDate: Date };
  }[];
}
