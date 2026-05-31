import Image from 'next/image';
import { Award, BadgeCheck, Plane } from 'lucide-react';
import { Container } from '@/components/layout/container';
import type { TrustedByContent } from '@/lib/site-content-schema';
import { defaultHomeSectionContent } from '@/lib/site-content-schema';

// Col-spans tạo 2 hàng đầy đủ (md: 3+3+3+3=12 | xl: 2+3+3+2+2=12)
// Hàng 2 (md: 4+4+4=12 | xl: 6+6=12)
const logoColSpans = [
  { md: 'md:col-span-3', xl: 'xl:col-span-3', imgClass: 'h-[clamp(72px,8vw,148px)] w-auto max-w-[78%]' }, // VietnamTravelers
  { md: 'md:col-span-3', xl: 'xl:col-span-3', imgClass: 'h-[clamp(58px,6.5vw,118px)] w-auto max-w-[82%]' }, // GetYourGuide
  { md: 'md:col-span-3', xl: 'xl:col-span-2', imgClass: 'h-[clamp(40px,4.8vw,88px)] w-auto max-w-[80%]' },  // Klook
  { md: 'md:col-span-4', xl: 'xl:col-span-2', imgClass: 'h-[clamp(44px,5.2vw,96px)] w-auto max-w-[80%]' },  // Trustpilot
];

export function TrustedByStrip({ content = defaultHomeSectionContent.trustedBy }: { content?: TrustedByContent } = {}) {
  return (
    <section
      id="trusted-by"
      className="relative overflow-hidden bg-ivory py-20 text-navy md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(200,169,106,0.14),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(11,27,43,0.06),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-navy/8" />

      <Container width="page" className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] lg:items-center xl:gap-16">
          {/* Heading left */}
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-gold-dark">{content.eyebrow}</p>
            <h2 className="mt-4 max-w-[15ch] font-serif text-[clamp(26px,4.9vw,76px)] font-semibold leading-[0.95] tracking-[-0.06em] text-navy">
              {content.heading}
            </h2>
            <p className="mt-6 max-w-[34rem] text-[14px] font-semibold leading-7 tracking-[-0.02em] text-navy/72 md:text-[18px] md:leading-8 lg:text-[20px]">
              {content.lead}
            </p>
            <span className="mt-8 block h-px w-24 bg-gold" />
          </div>

          {/* Logos right — single row */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-navy/12" />
              <span className="shrink-0 text-[11px] font-black uppercase tracking-[0.22em] text-gold-dark">{content.partnersLabel}</span>
              <span className="h-px flex-1 bg-navy/12" />
            </div>

            <div className="no-scrollbar flex items-center gap-x-6 overflow-x-auto pb-1 md:overflow-visible md:pb-0 xl:gap-x-8">
              {/* Travelers Choice */}
              <figure className="group flex shrink-0 flex-col items-center gap-2 text-center">
                <Award className="h-9 w-9 stroke-[1.3] text-gold-dark transition duration-300 ease-luxe group-hover:scale-105" />
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-navy/68">Travelers Choice</p>
                <p className="text-[9px] font-bold text-navy/40">Best of the Best</p>
              </figure>

              <span className="h-10 w-px shrink-0 bg-navy/10" />

              {/* Image logos */}
              {content.logos.map((logo, i) => (
                <figure key={logo.name} className="group shrink-0">
                  <Image
                    src={logo.src}
                    alt={`${logo.name} trusted logo`}
                    width={logo.width}
                    height={logo.height}
                    quality={100}
                    unoptimized
                    className={`${i === 0 ? 'h-[clamp(54px,5.2vw,84px)]' : i === 1 ? 'h-[clamp(44px,4.2vw,68px)]' : i === 2 ? 'h-[clamp(30px,2.8vw,46px)]' : 'h-[clamp(32px,3vw,50px)]'} w-auto max-w-[160px] object-contain drop-shadow-[0_8px_18px_rgba(11,27,43,0.06)] transition duration-300 ease-luxe group-hover:scale-105`}
                  />
                </figure>
              ))}

              <span className="h-10 w-px shrink-0 bg-navy/10" />

              {/* IATA */}
              <figure className="group flex shrink-0 flex-col items-center gap-2 text-center">
                <Plane className="h-8 w-8 stroke-[1.3] text-navy/38 transition duration-300 ease-luxe group-hover:scale-105 group-hover:text-gold-dark" />
                <p className="text-[14px] font-black uppercase leading-none tracking-[-0.04em] text-navy/55 transition duration-300 group-hover:text-gold-dark">IATA</p>
                <p className="text-[9px] font-bold text-navy/38">Air travel standard</p>
              </figure>

              {/* PATA */}
              <figure className="group flex shrink-0 flex-col items-center gap-2 text-center">
                <BadgeCheck className="h-8 w-8 stroke-[1.3] text-navy/38 transition duration-300 ease-luxe group-hover:scale-105 group-hover:text-gold-dark" />
                <p className="text-[14px] font-black uppercase leading-none tracking-[-0.04em] text-navy/55 transition duration-300 group-hover:text-gold-dark">PATA</p>
                <p className="text-[9px] font-bold text-navy/38">Pacific Asia network</p>
              </figure>
            </div>
          </div>
        </div>

        {/* Press bar */}
        <div className="mt-14 grid gap-5 border-t border-navy/10 pt-8 md:mt-16 md:grid-cols-[170px_minmax(0,1fr)] md:items-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gold-dark">{content.pressLabel}</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-[13px] font-black uppercase tracking-[0.1em] text-navy/48 md:justify-end md:gap-x-12 xl:gap-x-14">
            {content.pressMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
