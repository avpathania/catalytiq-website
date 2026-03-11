'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Detect current locale from pathname
    if (pathname.startsWith('/it')) {
      setCurrentLocale('it');
    } else {
      setCurrentLocale('en');
    }
  }, [pathname]);

  const otherLocale = currentLocale === 'en' ? 'it' : 'en';
  
  // Generate the target path for language switching
  const getTargetPath = () => {
    if (currentLocale === 'en') {
      // Switch to Italian: add /it prefix
      return `/it${pathname}`;
    } else {
      // Switch to English: remove /it prefix
      return pathname.replace(/^\/it/, '') || '/';
    }
  };

  return (
    <Link href={getTargetPath()}>
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
        aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Italian'}`}
      >
        {otherLocale === 'en' ? '🇬🇧 EN' : '🇮🇹 IT'}
      </button>
    </Link>
  );
};

export default LanguageSwitcher;