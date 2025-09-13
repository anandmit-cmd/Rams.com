
'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Smartphone, X } from 'lucide-react';
import { Button } from './ui/button';

export function DesktopOnlyAlert() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (isNowMobile) {
        // Only show if it hasn't been dismissed in this session
        if (sessionStorage.getItem('dismissedMobileAlert') !== 'true') {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dismissedMobileAlert', 'true');
  };

  if (!isVisible || !isMobile) {
    return null;
  }

  return (
    <Alert className="md:hidden fixed top-0 left-0 right-0 z-[101] m-2 border-primary bg-background shadow-lg">
      <Smartphone className="h-4 w-4" />
      <AlertTitle>Optimal Experience</AlertTitle>
      <AlertDescription>
        For a better experience, please use a desktop device.
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}
