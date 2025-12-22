export const dynamic = "force-dynamic";

import Contact from '@/components/modules/home/Contact'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Local Guide – Contact us",
}

const ContactPage = () => {
  return <Contact />
}

export default ContactPage