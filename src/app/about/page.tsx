
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { ArrowLeft, Languages } from 'lucide-react';

const content = {
  en: {
    title: "About Us",
    intro: "RAMS is a pioneering initiative designed to create a Hybrid Ecosystem in Healthcare. Our aim is to bring together online, offline, and medical solutions on a single platform, making healthcare simple, accessible, and trustworthy for everyone. In today’s fast-changing world, healthcare is no longer confined to hospitals and clinics. Patients now expect faster, reliable, and integrated solutions. RAMS is built to address these needs by offering a seamless blend of technology and medical expertise.",
    visionTitle: "Our Vision",
    visionText: "To deliver accessible, affordable, and quality healthcare to every household. We envision a future where every individual can access reliable medical care, consultation, and essential healthcare services without complexity.",
    missionTitle: "Our Mission",
    missionPoints: [
      "To provide healthcare services through a hybrid model (online + offline).",
      "To integrate doctors, pharmacies, diagnostic centers, and hospitals on a single platform.",
      "To use technology for faster, safer, and more reliable healthcare.",
      "To bridge the gap between rural and urban healthcare access."
    ],
    futureTitle: "Our Future",
    futurePoints: [
      "Digital Healthcare Platform: A comprehensive app and portal offering doctor consultations, lab test bookings, medicine delivery, and health insurance services.",
      "AI & IoT-based Services: Smart devices and AI-enabled monitoring for better patient health management.",
      "Collaborations & Expansion: Partnering with hospitals, clinics, and health-tech firms to broaden services.",
      "Global Outlook: Starting from India and expanding RAMS as a trusted healthcare brand worldwide."
    ],
    summaryTitle: "In Short",
    summaryText: "👉 RAMS is not just a healthcare provider but a trusted healthcare partner, connecting patients, doctors, and institutions to build a healthier future."
  },
  hi: {
    title: "हमारे बारे में",
    intro: "RAMS एक ऐसा प्रयास है जो हेल्थकेयर में हाइब्रिड इकोसिस्टम (Hybrid Ecosystem) को हकीकत में बदलने के लिए बनाया गया है। हमारा उद्देश्य है कि ऑनलाइन, ऑफलाइन और मेडिकल क्षेत्र के सभी समाधान एक ही प्लेटफ़ॉर्म पर उपलब्ध हों, ताकि स्वास्थ्य सेवाएँ सरल, भरोसेमंद और सभी के लिए सुलभ बन सकें। आज के बदलते दौर में स्वास्थ्य सेवाएँ सिर्फ अस्पतालों और क्लिनिक तक सीमित नहीं रह गई हैं। मरीज अब तेज़, सुरक्षित और एकीकृत सेवाओं की उम्मीद करते हैं। इन्हीं ज़रूरतों को ध्यान में रखते हुए RAMS की शुरुआत की गई है।",
    visionTitle: "हमारा विज़न",
    visionText: "हर घर तक सुलभ, किफायती और गुणवत्तापूर्ण स्वास्थ्य सेवाएँ पहुँचाना। हमारा सपना है कि हर व्यक्ति को बिना किसी जटिलता के बेहतर इलाज, मेडिकल परामर्श और आवश्यक स्वास्थ्य सेवाएँ एक ही स्थान पर उपलब्ध हों।",
    missionTitle: "हमारा मिशन",
    missionPoints: [
      "मरीजों को हाइब्रिड मॉडल (ऑनलाइन + ऑफलाइन) के माध्यम से सेवाएँ उपलब्ध कराना।",
      "डॉक्टर, फार्मेसी, डायग्नोस्टिक सेंटर और हॉस्पिटल्स को एकीकृत करके एक ही प्लेटफ़ॉर्म पर लाना।",
      "तकनीक का उपयोग कर स्वास्थ्य सेवाओं को तेज़, सुरक्षित और भरोसेमंद बनाना।",
      "ग्रामीण और शहरी इलाकों के बीच हेल्थकेयर की खाई को खत्म करना।"
    ],
    futureTitle: "हमारा भविष्य",
    futurePoints: [
      "डिजिटल हेल्थकेयर प्लेटफ़ॉर्म: एक ऐसा ऐप और पोर्टल जहाँ डॉक्टर परामर्श, लैब टेस्ट बुकिंग, दवाइयों की होम डिलीवरी और हेल्थ इंश्योरेंस सेवाएँ एक जगह उपलब्ध हों।",
      "AI और IoT आधारित सेवाएँ: स्मार्ट डिवाइस और आर्टिफिशियल इंटेलिजेंस से बेहतर स्वास्थ्य मॉनिटरिंग।",
      "साझेदारी और विस्तार: अस्पतालों, क्लीनिक्स और हेल्थ-टेक कंपनियों के साथ मिलकर सेवाओं का विस्तार।",
      "वैश्विक दृष्टिकोण: भारत से शुरू करके RAMS को अंतरराष्ट्रीय स्तर पर एक भरोसेमंद हेल्थकेयर ब्रांड बनाना।"
    ],
    summaryTitle: "संक्षेप में",
    summaryText: "👉 RAMS सिर्फ एक सेवा प्रदाता नहीं बल्कि एक विश्वसनीय हेल्थकेयर पार्टनर है, जो मरीजों, डॉक्टरों और स्वास्थ्य संस्थानों को जोड़कर एक बेहतर और स्वस्थ भविष्य की ओर बढ़ रहा है।"
  }
};

export default function AboutUsPage() {
  const [language, setLanguage] = useState<'en' | 'hi' | null>(null);

  const currentContent = language ? content[language] : null;

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <AppLogo className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-gray-800">RAMS.com</span>
        </Link>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto shadow-lg">
            {!currentContent ? (
              <CardContent className="p-10 text-center">
                <Languages className="w-16 h-16 mx-auto text-primary mb-4" />
                <CardTitle className="text-3xl font-bold">Choose Your Language</CardTitle>
                <CardDescription className="mt-2 text-lg">Select a language to read about us.</CardDescription>
                <div className="flex justify-center gap-6 mt-8">
                  <Button size="lg" onClick={() => setLanguage('en')}>Read in English</Button>
                  <Button size="lg" onClick={() => setLanguage('hi')}>हिंदी में पढ़ें</Button>
                </div>
              </CardContent>
            ) : (
              <div>
                <CardHeader>
                  <Button onClick={() => setLanguage(null)} variant="ghost" className="mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Language
                  </Button>
                  <CardTitle className="text-4xl font-bold text-center">{currentContent.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 md:px-10 py-8 space-y-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">{currentContent.intro}</p>

                  <div className="space-y-6">
                    <section>
                      <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">{currentContent.visionTitle}</h2>
                      <p className="text-muted-foreground">{currentContent.visionText}</p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">{currentContent.missionTitle}</h2>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {currentContent.missionPoints.map((point, index) => <li key={index}>{point}</li>)}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">{currentContent.futureTitle}</h2>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {currentContent.futurePoints.map((point, index) => <li key={index}>{point}</li>)}
                      </ul>
                    </section>
                  </div>

                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-xl font-bold">{currentContent.summaryTitle}</h3>
                    <p className="mt-2 text-lg text-primary font-medium">{currentContent.summaryText}</p>
                  </div>
                </CardContent>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
