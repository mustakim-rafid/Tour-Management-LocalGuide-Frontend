import PendingRequestsGrid from "@/components/modules/guide/booking/PendingRequestGrid"
import { getGuideTours } from "@/services/tour/tour.service"

const PendingRequestsPage = async () => {
    const tourWithPendingBookings = await getGuideTours("status=PENDING")

  return (
    <div className="p-4 space-y-5">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Tour Requests
      </h1>
      <PendingRequestsGrid tours={tourWithPendingBookings.data} />
    </div>
  )
}

export default PendingRequestsPage