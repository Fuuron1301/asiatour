import { HomePage } from '@/components/home/home-page';
import { getContent } from '@/lib/cms';
import { getOptionBlocks, getReusableBlockMap } from '@/lib/blocks/cms-runtime';
import { getSiteContent } from '@/lib/site-content';
import type { CmsItem } from '@/lib/types';

export const revalidate = 900;

// Slim down CmsItem data — chỉ giữ các field cần thiết cho homepage
// Loại bỏ content (HTML đầy đủ), gallery, itinerary, faq, blocks...
// để giảm RSC payload serialize vào HTML (960KB → nhỏ hơn đáng kể)
function slimTour(t: CmsItem) {
  return {
    id: t.id,
    type: t.type,
    slug: t.slug,
    title: t.title,
    featuredImage: t.featuredImage,
    excerpt: '',
    content: '',
    meta: { details: t.meta.details ?? {} },
  } as CmsItem;
}

function slimPost(p: CmsItem) {
  return {
    id: p.id,
    type: p.type,
    slug: p.slug,
    title: p.title,
    featuredImage: p.featuredImage,
    excerpt: p.excerpt,
    content: '',
    meta: { details: p.meta.details ?? {} },
  } as CmsItem;
}

function slimTestimonial(t: CmsItem) {
  return {
    id: t.id,
    type: t.type,
    slug: t.slug,
    title: t.title,
    featuredImage: '',
    excerpt: t.excerpt,
    content: '',
    meta: {},
  } as CmsItem;
}

function slimStyle(s: CmsItem) {
  return {
    id: s.id,
    type: s.type,
    slug: s.slug,
    title: s.title,
    featuredImage: s.featuredImage,
    excerpt: s.excerpt,
    content: '',
    meta: { details: s.meta.details ?? {} },
  } as CmsItem;
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
  return <HomePage
    tours={tours.slice(0, 30).map(slimTour)}
    styles={styles.map(slimStyle)}
    testimonials={testimonials.slice(0, 5).map(slimTestimonial)}
    posts={posts.slice(0, 9).map(slimPost)}
    siteContent={siteContent}
    cmsBlocks={cmsBlocks}
    reusableBlocks={reusableBlocks}
  />;
}


