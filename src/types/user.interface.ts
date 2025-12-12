export type UserRole = "ADMIN" | "GUIDE" | "TOURIST";

export type UserStatus = "ACTIVE" | "INACTIVE" | "DELETED";

export interface UserInfo {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  admin?: {
    name: string;
    id: string;
    email: string;
    profilePhoto: string | null;
    address: string | null;
    contactNumber: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  guide?: {
    name: string;
    id: string;
    email: string;
    profilePhoto: string | null;
    address: string | null;
    contactNumber: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    bio: string | null;
    experienceYears: number;
    avrgRating: number;
  } | null;
  tourist?: {
    name: string;
    id: string;
    email: string;
    profilePhoto: string | null;
    address: string | null;
    contactNumber: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
