import TourProfileContent from "@/components/modules/tour/TourProfileContent";
import { getTourById } from "@/services/tour/tour.service";

const TourDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
    const { id } = await params
    const tour = await getTourById(id)

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
        <TourProfileContent tour={tour.data} />
    </div>
  )
}

export default TourDetailsPage