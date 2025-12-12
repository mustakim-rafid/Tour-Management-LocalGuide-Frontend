import PublicFooter from '@/components/shared/PublicFooter'
import { PublicNavbar } from '@/components/shared/PublicNavbar'
import { ReactNode } from 'react'

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
        <PublicNavbar />
        {children}
        <PublicFooter />
    </div>
  )
}

export default PublicLayout