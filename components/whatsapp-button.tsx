'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { brandWhatsappHref } from '@/lib/brand-contact';
import { trackEvent } from '@/lib/tracking';

export function WhatsAppButton() {
  const pathname = usePathname();
  const href = brandWhatsappHref('Hello, I would like to plan a private luxury trip.');
  const isTourDetail = /^\/[a-z-]+-tours\/[^/]+\/?$/.test(pathname);
  const isConversionFlow = pathname.startsWith('/customize-your-trip') || pathname.startsWith('/payment');
  const isSimCardPage = pathname.startsWith('/sim-card');

  if (isTourDetail || isConversionFlow || isSimCardPage) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      aria-label="Contact us on WhatsApp"
      className="group fixed bottom-[calc(var(--mobile-bottom-nav-space)+18px)] right-[14px] z-[75] grid h-[54px] w-[54px] place-items-center rounded-full bg-[#34b442] text-white shadow-[0_16px_36px_rgba(0,0,0,0.22),0_0_0_5px_rgba(52,180,66,0.12)] ring-1 ring-white/25 transition duration-300 ease-luxe hover:-translate-y-0.5 hover:scale-105 hover:bg-[#42c750] hover:shadow-[0_20px_42px_rgba(0,0,0,0.26),0_0_0_7px_rgba(52,180,66,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/65 md:bottom-[calc(var(--mobile-bottom-nav-space)+22px)] md:right-[22px] md:h-[58px] md:w-[58px] lg:bottom-[24px]"
    >
      <MessageCircle className="h-6 w-6 transition duration-300 group-hover:scale-110" strokeWidth={2.05} />
    </a>
  );
}
