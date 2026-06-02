'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { Container } from '@/components/layout/container';

const videoId = 'YfCwJMpm2zY';
const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`;
const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

export function VietnamTripIntroCard() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-[#f8f5ef] px-0 py-12 text-navy md:py-16">
      <Container width="page">
        <div className="grid overflow-hidden rounded-[34px] border border-navy/10 bg-[#fbf6ea] shadow-[0_28px_90px_rgba(11,27,43,0.12)] lg:grid-cols-[minmax(0,1.9fr)_minmax(360px,0.98fr)]">
          <div className="relative min-h-[300px] overflow-hidden bg-black sm:min-h-[420px] lg:min-h-[520px]">
            {playing ? (
              <iframe
                src={youtubeEmbedUrl}
                title="Ha Long Bay 5 star Cruise with Private Balcony"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 h-full w-full cursor-pointer"
                aria-label="Play Ha Long Bay cruise video"
              >
                <Image
                  src={thumbnailUrl}
                  alt="Ha Long Bay cruise video thumbnail"
                  fill
                  sizes="(min-width: 1280px) 55vw, 100vw"
                  quality={75}
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/28 transition duration-200 group-hover:bg-black/18" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.38)] transition duration-200 group-hover:scale-110 group-hover:bg-white">
                    <Play className="h-8 w-8 translate-x-0.5 fill-[#0b1b2b] text-[#0b1b2b]" />
                  </span>
                </div>
              </button>
            )}
          </div>

          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-gold-dark">Vietnam trip</p>
            <h2 className="mt-5 max-w-[11ch] text-[clamp(42px,4.2vw,64px)] font-black leading-[1.02] tracking-[-0.055em] text-navy">
              Introducing Vietnam Trip
            </h2>
            <p className="mt-6 max-w-[34ch] text-[18px] font-medium leading-8 tracking-[-0.01em] text-navy/72">
              We have teamed up with one of the best travel service providers in Vietnam to bring you a more polished private travel experience.
            </p>
            <Link
              href="/vietnam-tours/"
              className="mt-10 inline-flex w-fit items-center gap-3 rounded-[6px] bg-[#e89448] px-8 py-5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_18px_40px_rgba(232,148,72,0.26)] transition duration-200 ease-luxe hover:-translate-y-0.5 hover:bg-gold hover:text-navy"
            >
              Explore journeys
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.1} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
