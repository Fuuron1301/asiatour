import Link from 'next/link';
import { Suspense } from 'react';
import { TailorMadeForm } from '@/components/tailor-made-form';
import { TourCatalog } from '@/components/tour-catalog';
import { JsonLd } from '@/components/seo/json-ld';
import { HeroSection } from '@/components/sections/hero-section';
import { Container, Grid12, Section } from '@/components/layout/container';
import { Accordion } from '@/components/ui/accordion';
import { CTAButton } from '@/components/ui/cta-button';
import { Eyebrow, Heading, Lead, BodyText } from '@/components/ui/typography';
import { getContent } from '@/lib/cms';
import { hubs } from '@/lib/fallback-data';
import { createBookingTourCatalog } from '@/lib/booking-tour-matcher';
import { faqSchema } from '@/lib/seo';
import { HubKey } from '@/lib/types';
import { hubOrder, hubPath, tourHubKey, tourPath } from '@/lib/routing';
import { getSiteContent } from '@/lib/site-content';
import { resolveStaticPagesContent } from '@/lib/site-content-schema';

const hubFaq = [
  { question: 'Are these private tours?', answer: 'Yes. Each itinerary is privately designed with selected hotels, guides and transfers.' },
  { question: 'Can I combine countries?', answer: 'Yes. The planning team can connect Vietnam, Thailand, Cambodia, Laos and Myanmar into one seamless route.' }
];

const hubHeroImages: Partial<Record<HubKey, { src: string; position: string }>> = {
  vietnam: { src: '/images/hubs/vietnam-ninh-binh-karsts-4k-crisp.jpg', position: '50% 50%' },
  thailand: { src: '/images/hubs/thailand-temple-4k.jpg', position: '50% 48%' },
  cambodia: { src: '/images/hubs/cambodia-angkor-wat-4k.jpg', position: '50% 52%' },
  laos: { src: '/images/hubs/laos-kuang-si-falls-4k.jpg', position: '50% 55%' },
  myanmar: { src: '/images/hubs/myanmar-bagan-temples-4k.jpg', position: '50% 46%' },
  'multi-country': { src: '/images/hubs/multi-country-mekong-4k.jpg', position: '50% 66%' }
};

import { LuxeSection, LuxeContainer, LuxeContainerWide, LuxeLinkButton, LuxeCard } from '@/components/ui/luxe-primitives';

export async function HubPage({ hubKey }: { hubKey: HubKey }) {
  const fallbackHub = hubs[hubKey];
  const [allTours, posts, siteContent] = await Promise.all([getContent('tours'), getContent('posts'), getSiteContent()]);
  const override = resolveStaticPagesContent(siteContent).hubs[hubKey] || {};
  const hub = {
    ...fallbackHub,
    kicker: override.kicker || fallbackHub.kicker,
    title: override.title || fallbackHub.title,
    intro: override.intro || fallbackHub.intro,
    narrative: override.narrative || fallbackHub.narrative,
    highlights: override.highlights && override.highlights.length ? override.highlights : fallbackHub.highlights
  };
  const navHeroImage = siteContent.navigation.tourChoices.find((item) => item.href.replace(/^\/+|\/+$/g, '') === fallbackHub.slug)?.image;
  const heroImage = override.heroImage
    ? { src: override.heroImage, position: override.heroPosition || '50% 50%' }
    : hubHeroImages[hubKey] || (navHeroImage ? { src: navHeroImage, position: '50% 50%' } : null) || hubHeroImages.vietnam || { src: '/images/hubs/vietnam-ninh-binh-karsts-4k-crisp.jpg', position: '50% 50%' };
  const primaryCtaLabel = override.primaryCtaLabel || 'Plan this destination';
  const primaryCtaHref = override.primaryCtaHref || '/customize-your-trip/';
  const secondaryCtaLabel = override.secondaryCtaLabel || 'View tours';
  const secondaryCtaHref = override.secondaryCtaHref || '#tours';
  const sectionEyebrow = override.sectionEyebrow || 'Private destination journeys';
  const sectionHeadingSuffix = override.sectionHeadingSuffix || 'crafted for the way you want to feel.';
  const featuredEyebrow = override.featuredEyebrow || 'Featured journeys';
  const featuredLead = override.featuredLead || 'Compare curated routes with generous imagery, clear public pricing and a calm layout built for confident planning.';
  const bookingTourCatalog = createBookingTourCatalog(allTours);
  const tours = allTours.filter((tour) => {
    return tourHubKey(tour) === hubKey;
  });
  const featured = tours.length ? tours : allTours.slice(0, 3);
  const relatedPosts = posts.filter((post) => {
    const haystack = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
    return haystack.includes(hubKey.split('-')[0]) || haystack.includes('indochina') || hubKey === 'multi-country';
  });
  const neighborHubs = hubOrder.filter((item) => item.key !== hubKey);

  return (
    <main className="ql-page-shell bg-ivory">
      <HeroSection eyebrow={hub.kicker} title={hub.title} subtitle={hub.intro} image={heroImage.src} imagePosition={heroImage.position} primaryCta={{ href: primaryCtaHref, label: primaryCtaLabel }} secondaryCta={{ href: secondaryCtaHref, label: secondaryCtaLabel }} />
      {featured.length > 0 && (
        <section id="tours" className="relative z-10 -mt-[72px] pb-16">
          <LuxeContainerWide className="relative [&>div:first-child]:mt-0">
            <Suspense fallback={null}>
              <TourCatalog tours={featured} hubTitle={hub.title} />
            </Suspense>
          </LuxeContainerWide>
        </section>
      )}
      <LuxeSection className="py-[var(--ql-section-md)]">
        <LuxeContainer>
          <Grid12>
            <LuxeCard className="p-8 md:col-span-7 bg-white shadow-soft">
              <Eyebrow>{sectionEyebrow}</Eyebrow>
              <Heading className="ds-gold-rule mt-4 text-navy">{hub.title}: {sectionHeadingSuffix}</Heading>
              <Lead className="mt-8">{hub.intro}</Lead>
              <BodyText className="mt-6">{hub.narrative}</BodyText>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {hub.highlights.map((item) => (
                  <div key={item} className="rounded-xl border border-gold/20 bg-ivory/40 p-4 text-sm font-extrabold leading-6 text-navy/70">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <LuxeLinkButton href="/customize-your-trip/" tone="dark" size="md">
                  Customize Your Trip
                </LuxeLinkButton>
                <LuxeLinkButton href="/blog/" tone="light" size="md">
                  Read guides
                </LuxeLinkButton>
              </div>
            </LuxeCard>
            <aside className="md:col-span-5"><TailorMadeForm compact tourCatalog={bookingTourCatalog} /></aside>
          </Grid12>
        </LuxeContainer>
      </LuxeSection>
      <LuxeSection className="py-[var(--ql-section-md)] bg-pearl">
        <LuxeContainer>
          <Grid12>
            <div className="md:col-span-7">
              <Eyebrow>Travel intelligence</Eyebrow>
              <Heading className="mt-4 text-navy">Guides that help refine your route.</Heading>
              {(relatedPosts.length || posts.length) ? (
                <div className="mt-8 grid gap-4">
                  {(relatedPosts.length ? relatedPosts : posts).slice(0, 3).map((post) => (
                    <LuxeCard key={post.slug} className="bg-white p-6 shadow-soft hover:-translate-y-1 transition duration-200">
                      <Link href={`/blog/${post.slug}/`} className="block">
                        <span className="text-sm font-extrabold uppercase tracking-widest text-gold-dark">Travel guide</span>
                        <h3 className="ds-h3 mt-4 text-navy">{post.title}</h3>
                        <BodyText className="mt-4 text-sm">{post.excerpt}</BodyText>
                      </Link>
                    </LuxeCard>
                  ))}
                </div>
              ) : (
                <BodyText className="mt-8">Destination guides are being curated by our travel designers.</BodyText>
              )}
            </div>
            <aside className="md:col-span-5">
              <Eyebrow>Tour categories</Eyebrow>
              <Heading level={3} className="mt-4 text-navy">Other standard tour hubs</Heading>
              <div className="mt-8 grid gap-4">
                {neighborHubs.map((item) => (
                  <LuxeCard key={item.key} className="border border-gold/20 bg-white p-6 shadow-sm hover:border-gold hover:-translate-y-1 transition duration-200">
                    <Link href={hubPath(item.key)} className="block font-serif text-2xl tracking-widest text-navy">
                      {item.label}
                    </Link>
                  </LuxeCard>
                ))}
              </div>
              {featured[0] && (
                <LuxeCard tone="dark" className="mt-8 p-6 shadow-soft bg-navy">
                  <p className="text-sm font-extrabold uppercase tracking-widest text-gold">Recommended tour</p>
                  <Link href={tourPath(featured[0])} className="mt-4 block font-serif text-3xl tracking-widest text-pearl hover:text-gold transition">
                    {featured[0].title}
                  </Link>
                </LuxeCard>
              )}
            </aside>
          </Grid12>
        </LuxeContainer>
      </LuxeSection>
      <LuxeSection className="py-[var(--ql-section-md)]">
        <LuxeContainer className="max-w-4xl">
          <Eyebrow>Questions</Eyebrow>
          <Heading className="mt-4 text-navy">FAQ</Heading>
          <div className="mt-8">
            <Accordion items={hubFaq} />
          </div>
        </LuxeContainer>
      </LuxeSection>
      <JsonLd data={faqSchema(hubFaq)} />
    </main>
  );
}

