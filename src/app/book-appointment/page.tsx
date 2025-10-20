
import React from 'react';
import type { Metadata } from 'next';
import { initializeFirebase } from '@/firebase';
import { doc, getDoc, DocumentData } from "firebase/firestore"; 
import BookAppointmentClientPage from './book-appointment-client';
import { FirebaseClientProvider } from '@/firebase/client-provider';

async function fetchDoctorData(doctorId: string | null): Promise<DocumentData | null> {
    if (!doctorId) return null;
    try {
        const { firestore } = initializeFirebase();
        const docRef = doc(firestore, "users", doctorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching doctor for metadata:", error);
        return null;
    }
}

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  const doctorId = searchParams.doctorId as string | null;
  const doctor = await fetchDoctorData(doctorId);

  if (!doctor) {
    return {
      title: 'Book Appointment | RAMS.com',
      description: 'Select a doctor to book an appointment.',
    };
  }

  return {
    title: `Book Appointment with ${doctor.fullName} | RAMS.com`,
    description: `Schedule an appointment with ${doctor.fullName}, a specialist in ${doctor.specialty}.`,
  };
}


export default function BookAppointmentPage() {
  return (
    <FirebaseClientProvider>
        <React.Suspense fallback={<div>Loading...</div>}>
            <BookAppointmentClientPage />
        </React.Suspense>
    </FirebaseClientProvider>
  );
}

    