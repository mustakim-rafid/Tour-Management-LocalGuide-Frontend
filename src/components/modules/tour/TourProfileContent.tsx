"use client";

import Image from "next/image";
import { ITour } from "@/types/tour.interface";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  User,
  DollarSign,
  Flag,
  Mail,
} from "lucide-react";
import { format } from "date-fns";

interface TourProfileContentProps {
  tour: ITour;
}

export default function TourProfileContent({ tour }: TourProfileContentProps) {
  const guide = tour.guide;

  return (
    <div className="space-y-8">
      {/* TOUR HEADER SECTION */}
      <Card className="overflow-hidden">
        <div className="relative w-full h-72 md:h-[400px]">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-contain"
          />
        </div>

        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{tour.title}</h1>
              <p className="text-muted-foreground mt-1">{tour.description}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <Badge variant="secondary" className="text-sm">
                {format(new Date(tour.tourDate), "PPP")}
              </Badge>
              <div className="flex items-center gap-2 text-primary">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold text-lg">
                  BDT {tour.tourFee}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOUR DETAILS GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tour Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>
                <strong>Duration:</strong> {tour.duration}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
              <span>
                <strong>Meeting Point:</strong> {tour.meetingPoint}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>
                <strong>Max Group Size:</strong> {tour.maxGroupSize}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>
                <strong>Date:</strong>{" "}
                {format(new Date(tour.tourDate), "EEEE, MMMM d, yyyy")}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* GUIDE INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle>Guide Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {guide ? (
              <>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {guide.profilePhoto ? (
                      <AvatarImage src={String(guide.profilePhoto)} />
                    ) : (
                      <AvatarFallback className="text-lg">
                        {guide.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div>
                    <h2 className="font-semibold text-lg">{guide.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {guide.experienceYears} years experience
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{guide.avrgRating.toFixed(1)} rating</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-5 w-5" />
                  <span>{guide.email}</span>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                Guide information unavailable.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* GUIDE REVIEWS */}
      <Card>
        <CardHeader>
          <CardTitle>Guide Reviews</CardTitle>
        </CardHeader>

        <CardContent>
          {!guide?.reviews || guide.reviews.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No reviews yet for this guide.
            </p>
          ) : (
            <div className="space-y-4">
              {guide.reviews.map((review, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {review.tourist.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2 flex-1">
                      {/* Name + Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {review.tourist.name}
                          </span>

                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {review.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-sm text-primary">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
