'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { defaultLocale, localizeHref, stripLocaleFromPathname } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import type { Locale } from '@/lib/types';

type Variant = 'primary' | 'secondary' | 'dark';

export function CTAButton({ href, children, variant = 'primary', className = '' }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  const pathname = usePathname() || '/';
  const locale = stripLocaleFromPathname(pathname).locale || defaultLocale;
  const styles = {
    primary: 'border-gold/70 bg-gold text-navy shadow-[0_10px_24px_rgba(200,169,106,0.18)] hover:bg-pearl',
    secondary: 'border-current bg-transparent text-current hover:border-gold hover:text-gold',
    dark: 'border-navy bg-navy text-pearl hover:border-gold hover:bg-gold hover:text-navy'
  }[variant];

  const localizedHref = localizeHref(href, locale as Locale);

  return <Link href={localizedHref} onClick={() => trackEvent('cta_click', { href: localizedHref, label: String(children) })} className={cn('ql-button min-h-[46px] px-[20px] text-[12px]', styles, className)}>{children}</Link>;
}
