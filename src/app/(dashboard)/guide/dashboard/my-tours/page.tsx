import TourHeader from "@/components/modules/guide/tour/TourHeader"
import TourTable from "@/components/modules/guide/tour/TourTable"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader"
import RefreshButton from "@/components/shared/RefreshButton"
import { getGuideTours } from "@/services/tour/tour.service"

const MyToursPage = async () => {
  const guideTours = await getGuideTours()

  return (
    <div className="p-4 space-y-6">
      <TourHeader />
      <RefreshButton />
      <TourTable tourData={guideTours.data} />
    </div>
  )
}

export default MyToursPage