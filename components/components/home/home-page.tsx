import { CmsItem } from '@/lib/types';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/hero-section';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { HeroTourSearch } from '@/components/sections/hero-tour-search';
import { CmsBlockRenderer } from '@/components/blocks/cms-block-renderer';
import type { CmsBlockNode, ReusableBlockMap } from '@/lib/blocks/block-types';
import { defaultSiteContent, resolveHomeSectionContent, type HomeSectionId, type SiteContent } from '@/lib/site-content-schema';

// Restored missing sections imports
import { TripStyleDeck } from '@/components/sections/trip-style-deck';
import { HomeFeatureSpotlight } from '@/components/sections/home-feature-spotlight';
import { JourneyFlow } from '@/components/sections/journey-flow';
import { EasyBookingSteps } from '@/components/sections/easy-booking-steps';
import { TrustedByStrip } from '@/components/sections/trusted-by-strip';

// Lazy-loaded để giảm TBT và JS bundle ban đầu
const TestimonialCinema = dynamic(() => import('@/components/sections/testimonial-cinema').then(m => ({ default: m.TestimonialCinema })));
const BlogPreview = dynamic(() => import('@/components/sections/blog-preview').then(m => ({ default: m.BlogPreview })));
const MemoryGallery = dynamic(() => import('@/components/sections/memory-gallery').then(m => ({ default: m.MemoryGallery })));
const FeaturedTours = dynamic(() => import('@/components/sections/featured-tours').then(m => ({ default: m.FeaturedTours })));
const TravelDesignersStrip = dynamic(() => import('@/components/sections/travel-designers-strip').then(m => ({ default: m.TravelDesignersStrip })));
const DestinationMosaic = dynamic(() => import('@/components/sections/destination-mosaic').then(m => ({ default: m.DestinationMosaic })));

type HomePageProps = {
  tours: CmsItem[];
  styles: CmsItem[];
  testimonials: CmsItem[];
  posts: CmsItem[];
  siteContent?: SiteContent;
  cmsBlocks?: CmsBlockNode[];
  reusableBlocks?: ReusableBlockMap;
};

import { LuxeSection, LuxeContainer } from '@/components/ui/luxe-primitives';

export function HomePage({ tours, testimonials, posts, siteContent = defaultSiteContent, cmsBlocks = [], reusableBlocks }: HomePageProps) {
  const hero = siteContent.home.hero;
  const sectionContent = resolveHomeSectionContent(siteContent);
  const hasCmsBlocks = cmsBlocks.length > 0;

  const sections: Record<HomeSectionId, ReactNode> = {
    destinations: <DestinationMosaic content={sectionContent.destinations} />,
    styles: <TripStyleDeck content={sectionContent.styles} />,
    featuredTours: <FeaturedTours tours={tours} content={sectionContent.featuredTours} />,
    spotlight: <HomeFeatureSpotlight content={sectionContent.spotlight} />,
    whyChooseUs: <WhyChooseUs content={sectionContent.whyChooseUs} />,
    journeyFlow: <JourneyFlow content={sectionContent.journeyFlow} />,
    bookingSteps: <EasyBookingSteps content={sectionContent.bookingSteps} />,
    testimonials: <TestimonialCinema testimonials={testimonials} content={sectionContent.testimonials} />,
    designers: <TravelDesignersStrip content={sectionContent.designers} />,
    trustedBy: <TrustedByStrip content={sectionContent.trustedBy} />,
    blogPreview: <BlogPreview posts={posts} content={sectionContent.blogPreview} />,
    memoryGallery: (
      <MemoryGallery
        eyebrow={sectionContent.memoryGallery.eyebrow}
        title={sectionContent.memoryGallery.heading}
        description={sectionContent.memoryGallery.description}
        sideNote={sectionContent.memoryGallery.sideNote}
      />
    )
  };

  return (
    <main className="ql-page-shell premium-compact">
      <HeroSection
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        images={hero.images}
        imagePosition={hero.images[0]?.position}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        showPlanningFilter={true}
      />
      {hasCmsBlocks ? (
        <LuxeSection className="py-[var(--ql-section-md)] bg-[color:var(--cms-color-background)]">
          <LuxeContainer className="max-w-7xl">
            <CmsBlockRenderer blocks={cmsBlocks} reusableBlocks={reusableBlocks} />
          </LuxeContainer>
        </LuxeSection>
      ) : null}
      {siteContent.home.sections.order.map((sectionId) => (
        siteContent.home.sections.visibility[sectionId] ? <div key={sectionId}>{sections[sectionId]}</div> : null
      ))}
    </main>
  );
}

