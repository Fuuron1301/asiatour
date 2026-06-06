import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@/components/layout/container';
import { MagneticButton } from '@/components/interactions/magnetic-button';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { CinematicHeroLayer, type HeroLayerImage } from '@/components/3d/cinematic-hero-layer';
// Lazy-load HeroTourSearch — phức tạp (useState, routing) nhưng không cần SSR critical path
const HeroTourSearch = dynamic(() => import('@/components/sections/hero-tour-search').then(m => m.HeroTourSearch));

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  image,
  images,
  imagePosition,
  primaryCta,
  secondaryCta,
  children,
  cinematic = true,
  showPlanningFilter = false
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  images?: readonly HeroLayerImage[];
  imagePosition?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: ReactNode;
  cinematic?: boolean;
  showPlanningFilter?: boolean;
}) {
  return (
    <section className="relative min-h-[clamp(560px,82svh,720px)] overflow-hidden bg-navy text-pearl">
      <div className="absolute inset-0">
        {cinematic ? <CinematicHeroLayer image={image} images={images} imagePosition={imagePosition} title={title} /> : null}
      </div>
      {/* Merge 2 gradient divs thành 1 → giảm compositing layers → cải thiện paint performance */}
      <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(11,27,43,0.42) 0%,rgba(11,27,43,0.50) 50%,rgba(11,27,43,0.94) 100%),radial-gradient(circle at 50% 45%,rgba(11,27,43,0.16) 0%,rgba(11,27,43,0.48) 58%,rgba(11,27,43,0.74) 100%)'}} />
      <Container width={showPlanningFilter ? 'page' : 'content'} className="relative flex min-h-[clamp(560px,82svh,720px)] items-center justify-center pt-[var(--site-header-height)] text-center">
        <div className={showPlanningFilter ? 'w-full max-w-[1480px]' : 'max-w-[960px]'}>
          <Eyebrow className="!text-[clamp(10px,0.72vw,13px)] !font-black !tracking-[0.28em] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">{eyebrow}</Eyebrow>
          <Heading level={1} className="mx-auto mt-4 max-w-[980px] !text-[clamp(34px,4.35vw,58px)] !leading-[1.02] text-pearl [text-shadow:0_4px_30px_rgba(0,0,0,0.62)]">{title}</Heading>
          <Lead className="mx-auto mt-4 max-w-[38rem] font-semibold !text-[clamp(14px,1vw,16px)] !leading-[1.62] ![color:rgba(248,245,239,0.94)] [text-shadow:0_2px_22px_rgba(0,0,0,0.82)]">{subtitle}</Lead>
          {(primaryCta || secondaryCta) && (
            <div className="mt-5 flex flex-col items-stretch justify-center gap-2 px-2 sm:flex-row sm:items-center sm:px-0">
              {primaryCta && <MagneticButton href={primaryCta.href} className="w-full justify-center sm:w-auto">{primaryCta.label}</MagneticButton>}
              {secondaryCta && <MagneticButton href={secondaryCta.href} className="w-full justify-center border border-pearl/30 bg-transparent text-pearl shadow-soft hover:border-gold hover:bg-transparent hover:text-gold sm:w-auto">{secondaryCta.label}</MagneticButton>}
            </div>
          )}
          {showPlanningFilter && <HeroTourSearch />}
          {children}
        </div>
      </Container>
    </section>
  );
}
