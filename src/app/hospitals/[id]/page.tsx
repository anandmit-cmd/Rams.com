
import { db } from '@/lib/firebase';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import type { Metadata } from 'next';
import HospitalDetailClientPage from './hospital-detail-client';


async function fetchHospitalData(id: string): Promise<DocumentData | null> {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (err) {
        console.error("Error fetching hospital for metadata:", err);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const hospital = await fetchHospitalData(params.id);

  if (!hospital) {
    return {
      title: 'Hospital Not Found | RAMS.com',
      description: 'The hospital you are looking for could not be found.',
    };
  }

  return {
    title: `${hospital.hospitalName} | RAMS.com`,
    description: `View details, doctors, and book appointments at ${hospital.hospitalName}. Located at ${hospital.address}.`,
  };
}


export default function HospitalDetailPage({ params }: { params: { id: string } }) {
    return <HospitalDetailClientPage params={params} />;
}
