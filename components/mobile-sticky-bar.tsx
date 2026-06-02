'use client';

import Link from 'next/link';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { brandContact, brandWhatsappHref } from '@/lib/brand-contact';
import { trackEvent } from '@/lib/tracking';

/**
 * Thanh CTA cố định ở đáy màn hình mobile (chỉ hiện dưới md).
 * Ẩn trên: trang thanh toán, trang customize (đã có form riêng), trang sim-card.
 * Trên tour detail pages: nút thứ 3 là "Book Tour" (scroll tới #booking).
 * Trên các trang khác: nút thứ 3 là "Plan My Trip".
 */
export function MobileStickyBar() {
  const pathname = usePathname();

  const isConversionFlow =
    pathname.startsWith('/customize-your-trip') ||
    pathname.startsWith('/payment') ||
    pathname.startsWith('/planning-flow');
  const isSimCardPage = pathname.startsWith('/sim-card');

  // Ẩn hoàn toàn trên conversion flow và sim card
  if (isConversionFlow || isSimCardPage) return null;

  const isTourDetail = /^\/[a-z-]+-tours\/[^/]+\/?$/.test(pathname);
  const whatsappHref = brandWhatsappHref('Hello, I want to book a private luxury tour.');

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] flex md:hidden border-t border-white/10 bg-[#0B1B2B]/95 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Quick actions"
    >
      {/* Nút gọi điện */}
      <a
        href={brandContact.phoneHref}
        onClick={() => trackEvent('phone_click', { location: 'mobile_sticky_bar' })}
        aria-label={`Gọi ${brandContact.phoneDisplay}`}
        className="flex flex-1 flex-col items-center justify-center gap-[3px] py-3 text-pearl/80 transition active:bg-white/10"
      >
        <Phone className="h-5 w-5" strokeWidth={2} />
        <span className="text-[10px] font-bold uppercase tracking-wide">Call</span>
      </a>

      <div className="w-px bg-white/10 self-stretch my-2" />

      {/* Nút WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent('whatsapp_click', { location: 'mobile_sticky_bar' })}
        aria-label="Chat trên WhatsApp"
        className="flex flex-1 flex-col items-center justify-center gap-[3px] py-3 text-[#34b442] transition active:bg-white/10"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2} />
        <span className="text-[10px] font-bold uppercase tracking-wide">WhatsApp</span>
      </a>

      <div className="w-px bg-white/10 self-stretch my-2" />

      {/* Nút Book Tour / Plan Trip */}
      {isTourDetail ? (
        <button
          onClick={() => {
            trackEvent('cta_click', { location: 'mobile_sticky_bar', href: '#booking' });
            document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          aria-label="Đặt tour"
          className="flex flex-1 flex-col items-center justify-center gap-[3px] py-3 bg-[#C8A96A] text-[#0B1B2B] font-black transition active:bg-[#b8924a]"
        >
          <CalendarCheck className="h-5 w-5" strokeWidth={2} />
          <span className="text-[10px] font-black uppercase tracking-wide">Book Tour</span>
        </button>
      ) : (
        <Link
          href="/customize-your-trip/"
          onClick={() => trackEvent('cta_click', { location: 'mobile_sticky_bar', href: '/customize-your-trip/' })}
          aria-label="Lên kế hoạch chuyến đi"
          className="flex flex-1 flex-col items-center justify-center gap-[3px] py-3 bg-[#C8A96A] text-[#0B1B2B] font-black transition active:bg-[#b8924a]"
        >
          <CalendarCheck className="h-5 w-5" strokeWidth={2} />
          <span className="text-[10px] font-black uppercase tracking-wide">Plan Trip</span>
        </Link>
      )}
    </div>
  );
}
