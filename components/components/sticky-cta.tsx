'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/tracking';
import { LuxeLinkButton } from '@/components/ui/luxe-primitives';

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isTourDetail = /^\/[a-z-]+-tours\/[^/]+\/?$/.test(pathname);
  const isConversionFlow = pathname.startsWith('/customize-your-trip') || pathname.startsWith('/payment');
  const isSimCardPage = pathname.startsWith('/sim-card');

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (isHomePage || isTourDetail || isConversionFlow || isSimCardPage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-[calc(var(--mobile-bottom-nav-space)+16px)] left-4 z-50 lg:bottom-6 md:left-6"
    >
      <LuxeLinkButton
        href="/customize-your-trip/"
        tone="gold"
        size="md"
        className="relative shadow-lift"
        onClick={() => trackEvent('cta_click', { location: 'sticky_cta', href: '/customize-your-trip/' })}
      >
        <motion.span className="absolute inset-0 rounded-[12px] border border-gold pointer-events-none" animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <PenLine className="relative h-4 w-4" />
        <span className="relative hidden md:inline text-navy" translate="no">Tailor-made / Customize Your Trip</span>
        <span className="relative md:hidden text-navy" translate="no">Plan Your Trip</span>
      </LuxeLinkButton>
    </motion.div>
  );
}
