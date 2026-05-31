'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, MapPin, Star } from 'lucide-react';
import { CmsItem } from '@/lib/types';
import { hoverLift, hoverTransition, imageZoom } from '@/lib/motion';
import { tourHubKey, tourPath } from '@/lib/routing';
import { tourDisplayImage, tourImageFallbacks } from '@/lib/tour-images';
import { cn } from '@/lib/utils';
import { SafeTourImage } from './safe-tour-image';

type TourReview = {
  rating: string;
  count: string;
  title: string;
  quote: string;
  author: string;
  date: string;
};

const fallbackReviews: Record<string, TourReview> = {
  vietnam: {
    rating: '4.98',
    count: '2,339 reviews',
    title: 'Delicious Hanoi street food tour!',
    quote: 'We were fortunate enough to experience an incredible food journey through Hanoi with a very special local guide. The day felt personal, generous and beautifully paced.',
    author: 'Michael J',
    date: 'Feb 26, 2024'
  },
  thailand: {
    rating: '4.97',
    count: '1,842 reviews',
    title: 'A flawless honeymoon from city to island.',
    quote: 'Every handoff was smooth, every hotel had the right atmosphere and the rhythm moved from Bangkok energy to island quiet without stress.',
    author: 'Marielavoyage',
    date: 'Dec 21, 2023'
  },
  cambodia: {
    rating: '4.96',
    count: '1,126 reviews',
    title: 'Chloe hits a home run for us!',
    quote: 'They took the ideas of four friends and created a memorable route. Logistics across temples, hotels and transfers were handled with calm confidence.',
    author: 'Seaside207741',
    date: 'Apr 6, 2024'
  },
  laos: {
    rating: '4.95',
    count: '904 reviews',
    title: 'Slow travel done right',
    quote: 'Luang Prabang, the Mekong and the lodges gave us the quiet reset we were hoping for.',
    author: 'Amelia R.',
    date: 'Oct 11, 2022'
  },
  myanmar: {
    rating: '4.95',
    count: '768 reviews',
    title: 'Bagan and Inle with the right rhythm',
    quote: 'Temple plains, lake villages and heritage cities were paced carefully, with private guiding that gave each stop real context.',
    author: 'Avery N.',
    date: 'Feb 8, 2024'
  },
  'multi-country': {
    rating: '4.99',
    count: '1,508 reviews',
    title: 'Seamless Indochina routing',
    quote: 'Vietnam, Cambodia and Laos connected naturally, with smart flights and generous rest days.',
    author: 'Marcus L.',
    date: 'Aug 27, 2023'
  },
  default: {
    rating: '4.98',
    count: '2,339 reviews',
    title: 'Excellent guest experience',
    quote: 'Every detail felt effortless, personal and beautifully paced from first plan to final transfer.',
    author: 'Private guest',
    date: 'Recent journey'
  }
};

function readText(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function readNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function normalizedFiveStarRating(value: unknown, fallback = 4.9) {
  const parsed = readNumber(value);
  if (!parsed) return fallback;
  const fivePoint = parsed > 5 && parsed <= 10 ? parsed / 2 : parsed;
  return Math.min(5, Math.max(0, fivePoint));
}

function formatFiveStarRating(value: unknown, fallback = '4.9') {
  const normalized = normalizedFiveStarRating(value, Number(fallback));
  return normalized.toFixed(1).replace(/\.0$/, '');
}

function formatUsd(value: unknown) {
  const number = readNumber(value);
  return number ? `$${Math.round(number).toLocaleString('en-US')}` : undefined;
}

function compactPrice(value: string) {
  if (/price on request|private quote/i.test(value)) return value;
  return value.replace(/^(?:From\s+)?USD\s+/i, '$').replace(/\s+pp$/i, '');
}

function initials(name: string) {
  const letters = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  return letters || 'G';
}

function tourReview(tour: CmsItem): TourReview {
  const details = tour.meta.details || {};
  const country = tourHubKey(tour);
  const preset = fallbackReviews[country] || fallbackReviews.default;

  return {
    rating: readText(details.reviewRating) || readText(details.rating) || preset.rating,
    count: readText(details.reviewCount) || preset.count,
    title: readText(details.reviewTitle) || preset.title,
    quote: readText(details.reviewQuote) || preset.quote,
    author: readText(details.reviewAuthor) || preset.author,
    date: readText(details.reviewDate) || preset.date
  };
}

export function SystemTourCard({ tour, horizontal = false }: { tour: CmsItem; horizontal?: boolean }) {
  const duration = String(tour.meta.details?.duration || 'Tailor-made');
  const style = String(tour.meta.details?.style || 'Private');
  const price = tour.meta.pricing?.[0]?.price || 'Price on request';
  const oldPrice = formatUsd(tour.meta.details?.oldPriceUsd);
  const route = readText(tour.meta.details?.route);
  const review = tourReview(tour);
  const fiveStarScore = normalizedFiveStarRating(review.rating);
  const displayRating = formatFiveStarRating(review.rating);
  const displayPrice = compactPrice(price);
  const hasNumericPrice = displayPrice.startsWith('$');
  const imageSrc = tourDisplayImage(tour);

  if (horizontal) {
    return (
      <Link href={tourPath(tour)} className="block w-[82vw] max-w-[580px] shrink-0 snap-start sm:w-[520px] xl:w-[560px]">
        <motion.article
          whileHover={{ y: -4 }}
          transition={hoverTransition}
          className="group h-full rounded-[24px] p-1 transition duration-200 ease-luxe focus-within:outline-none sm:p-0"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#eadbc1,#c8a96a_48%,#be1e2d)] text-[14px] font-extrabold uppercase tracking-[0.04em] text-[#231f20] shadow-[0_8px_24px_rgba(35,31,32,0.12)] ring-1 ring-[#fffef8]/80" aria-hidden="true">
              {initials(review.author)}
            </span>
            <span>
              <span className="block text-[20px] font-extrabold leading-tight text-[#231f20]">{review.author}</span>
              <span className="mt-1 block text-[16px] font-medium text-[#5e5e5e]">{review.date}</span>
            </span>
          </div>

          <div className="mt-8 flex gap-[6px] text-[#be1e2d]" aria-label={`${displayRating} out of 5`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-[20px] w-[20px] fill-[#be1e2d]" strokeWidth={1.45} />
            ))}
          </div>

          <h3 className="mt-6 text-[clamp(22px,2vw,27px)] font-extrabold leading-[1.25] tracking-[-0.025em] text-[#231f20] transition group-hover:text-[#be1e2d]">
            {review.title}
          </h3>
          <p className="mt-6 line-clamp-4 max-w-[58ch] text-[clamp(19px,1.35vw,24px)] font-medium leading-[1.55] tracking-[-0.015em] text-[#231f20]/82">
            {review.quote}
          </p>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link href={tourPath(tour)} className="group block h-full min-w-0 rounded-[16px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/45">
      <motion.article
        initial="rest"
        whileHover="hover"
        variants={hoverLift}
        transition={hoverTransition}
        className="flex h-full min-h-[455px] flex-col overflow-hidden ql-card border-gold/20 hover:border-gold/50 transition duration-200"
      >
        <div className="relative h-[188px] overflow-hidden bg-navy/10 sm:h-[205px] lg:h-[214px]">
          <motion.div variants={imageZoom} transition={{ ...hoverTransition, duration: 1.1 }} className="absolute inset-0">
            <SafeTourImage
              src={imageSrc}
              fallbackSrcs={tourImageFallbacks(tour, imageSrc)}
              alt={tour.title}
              fill
              sizes="(min-width: 1440px) 31vw, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,43,0.10)_0%,rgba(11,27,43,0.08)_44%,rgba(11,27,43,0.72)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(11,27,43,0.02)_0%,rgba(11,27,43,0.04)_42%,rgba(11,27,43,0.56)_100%)]" />
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-pearl/80 bg-pearl text-navy shadow-sm transition group-hover:bg-gold" aria-hidden="true">
            <Heart className="h-4 w-4 stroke-[2.2]" />
          </span>
          <div className="absolute left-3 right-14 top-3 flex flex-wrap gap-1.5">
            <span className="ql-badge bg-pearl/95 text-navy h-[26px] py-1 px-3 text-[10px] border-none shadow-sm">{duration}</span>
            <span className="ql-badge bg-gold text-navy h-[26px] py-1 px-3 text-[10px] border-none shadow-sm">{style}</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <span className="ql-badge bg-navy/80 text-pearl h-[26px] py-1 px-3 text-[10px] border-none shadow-sm">
              Private tour
            </span>
            <span className="ql-badge bg-pearl/90 text-navy h-[26px] py-1 px-3 text-[10px] border-none shadow-sm hidden sm:inline-flex">
              {review.count}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4 bg-[#fffaf1]">
          <h3 className="line-clamp-2 min-h-[3rem] font-serif text-[clamp(1.28rem,1.55vw,1.55rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-navy transition group-hover:text-gold-dark">{tour.title}</h3>
          <div className="mt-3 flex gap-2 rounded-[12px] border border-navy/10 bg-white px-3 py-2 text-[12px] font-bold leading-5 text-navy/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            <span className="line-clamp-2 min-w-0">{route || 'Route customized around your travel dates.'}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
            <span className="rounded-[6px] bg-[#176f4b] px-2 py-1 text-[12px] font-extrabold leading-none text-pearl">{fiveStarScore.toFixed(1)}</span>
            <span className="font-extrabold text-[#176f4b]">Excellent</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-navy/24" />
            <span className="font-bold text-navy/60">{review.count}</span>
          </div>
          <div className="mt-auto pt-4">
            <div className="flex flex-col gap-3 rounded-[12px] border border-navy/10 bg-white p-3 shadow-sm">
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-dark">{hasNumericPrice ? 'From' : 'Quote'}</span>
                <div className="mt-1 flex flex-wrap items-end gap-x-2 gap-y-1">
                  {oldPrice && <span className="pb-1 text-base font-bold text-navy/40 line-through">US{oldPrice}</span>}
                  <span className={cn('whitespace-nowrap font-extrabold leading-none tracking-[-0.04em]', hasNumericPrice ? 'text-[1.55rem] text-navy' : 'text-base text-navy')}>
                    {hasNumericPrice ? `US ${displayPrice}` : displayPrice}
                  </span>
                  {hasNumericPrice && <span className="pb-1 text-sm font-bold text-navy/50">/pax</span>}
                </div>
              </div>
              <span className="ql-button w-full min-h-[38px] rounded-[10px] bg-gold text-navy hover:bg-navy hover:text-pearl hover:border-navy border-gold transition text-[11px] shadow-sm">
                View tour <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 flex text-gold" aria-label={`${displayRating} out of 5 guest score`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-gold" />
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
