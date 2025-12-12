import PendingRequestsGrid from "@/components/modules/guide/booking/PendingRequestGrid"
import { getGuideTours } from "@/services/tour/tour.service"

const PendingRequestsPage = async () => {
    const tourWithPendingBookings = await getGuideTours("status=PENDING")

  return (
    <div className="p-4">
      <PendingRequestsGrid tours={tourWithPendingBookings.data} />
    </div>
  )
}

export default PendingRequestsPage