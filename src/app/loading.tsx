"use client";

import { MapPin } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background animate-fadeIn">
      {/* Tour-themed spinner */}
      <MapPin className="h-12 w-12 text-primary animate-bounce" />

      {/* Text */}
      <p className="text-sm text-muted-foreground">
        Loading the page...
      </p>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
