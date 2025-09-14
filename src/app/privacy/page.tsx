
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none mx-auto py-8 text-muted-foreground">
              <p><strong>Last Updated:</strong> July 23, 2024</p>
              
              <p>
                RAMS.com ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by RAMS.com.
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us. For example, we collect information when you create an account, book an appointment, use the AI symptom checker, or otherwise communicate with us. The types of information we may collect include your name, email address, phone number, health information you provide, and any other information you choose to provide.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our services;</li>
                <li>Improve, personalize, and expand our services;</li>
                <li>Understand and analyze how you use our services;</li>
                <li>Process your transactions and manage your appointments;</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes;</li>
                <li>Send you text messages and push notifications;</li>
                <li>Find and prevent fraud.</li>
              </ul>

              <h2>3. Sharing Your Information</h2>
              <p>We may share the information we collect in the following situations:</p>
              <ul>
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf;</li>
                <li>With healthcare providers (doctors, hospitals, labs, etc.) with whom you book appointments or services;</li>
                <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process;</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of RAMS.com or others.</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We use reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration, and destruction.
              </p>

              <h2>5. Your Choices</h2>
              <p>
                You may update, correct or delete your account information at any time by logging into your account. If you wish to delete your account, please email us at support@rams.com, but note that we may retain certain information as required by law or for legitimate business purposes.
              </p>

              <h2>6. Changes to This Privacy Policy</h2>
              <p>
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
              </p>
              
              <h2>7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@rams.com">privacy@rams.com</a>.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
