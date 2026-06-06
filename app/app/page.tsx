import { HomePage } from '@/components/home/home-page';
import { VietnamTripIntroCard } from '@/components/sections/vietnam-trip-intro-card';
import { TripDesignBanner } from '@/components/sections/trip-design-banner';
import { getContent } from '@/lib/cms';
import { getOptionBlocks, getReusableBlockMap } from '@/lib/blocks/cms-runtime';
import { getSiteContent } from '@/lib/site-content';
import type { CmsItem } from '@/lib/types';

export const revalidate = 900;

function slimTour(t: CmsItem) {
  const d = (t.meta?.details ?? {}) as Record<string, unknown>;
  return {
    id: t.id, type: t.type, slug: t.slug, title: t.title,
    featuredImage: t.featuredImage, excerpt: '', content: '',
    meta: {
      details: {
        route: d.route ?? '', places: d.places ?? [], country: d.country ?? '',
        sourceUrl: d.sourceUrl ?? '', duration: d.duration ?? '',
        reviewRating: d.reviewRating ?? '', rating: d.rating ?? '',
        reviewCount: d.reviewCount ?? '', reviewTitle: d.reviewTitle ?? '',
        reviewQuote: d.reviewQuote ?? '', reviewAuthor: d.reviewAuthor ?? '',
        reviewDate: d.reviewDate ?? '',
      }
    },
  } as CmsItem;
}
function slimPost(p: CmsItem) {
  return { id: p.id, type: p.type, slug: p.slug, title: p.title, featuredImage: p.featuredImage, excerpt: p.excerpt, content: '', meta: { details: p.meta.details ?? {} } } as CmsItem;
}
function slimTestimonial(t: CmsItem) {
  return { id: t.id, type: t.type, slug: t.slug, title: t.title, featuredImage: '', excerpt: t.excerpt, content: '', meta: {} } as CmsItem;
}
function slimStyle(s: CmsItem) {
  return { id: s.id, type: s.type, slug: s.slug, title: s.title, featuredImage: s.featuredImage, excerpt: s.excerpt, content: '', meta: { details: s.meta.details ?? {} } } as CmsItem;
}

export default async function Page() {
  const [tours, styles, testimonials, posts, siteContent] = await Promise.all([
    getContent('tours'),
    getContent('styles'),
    getContent('testimonials'),
    getContent('posts'),
    getSiteContent()
  ]);
  const cmsBlocks = await getOptionBlocks('homepage_cms_blocks');
  const reusableBlocks = cmsBlocks.length ? await getReusableBlockMap() : undefined;
  return (
    <>
      <HomePage
        tours={tours.slice(0, 12).map(slimTour)}
        styles={styles.map(slimStyle)}
        testimonials={testimonials.slice(0, 5).map(slimTestimonial)}
        posts={posts.slice(0, 6).map(slimPost)}
        siteContent={siteContent}
        cmsBlocks={cmsBlocks}
        reusableBlocks={reusableBlocks}
      />
      <VietnamTripIntroCard />
      <TripDesignBanner />
    </>
  );
}

