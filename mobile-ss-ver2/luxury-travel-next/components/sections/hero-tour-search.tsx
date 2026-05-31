'use client';

import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { bookingDestinations, bookingStyles } from '@/lib/booking-options';
import { hubOrder } from '@/lib/routing';

const durationOptions = [
  { value: 'all', label: 'Any duration' },
  { value: 'short', label: '1-6 days' },
  { value: 'classic', label: '7-10 days' },
  { value: 'deep', label: '11-15 days' },
  { value: 'epic', label: '16+ days' }
];

const budgetOptions = [
  { value: 'all', label: 'Any budget' },
  { value: 'under-1000', label: 'Under USD 1,000' },
  { value: '1000-2000', label: 'USD 1,000-2,000' },
  { value: '2000-3500', label: 'USD 2,000-3,500' },
  { value: '3500-plus', label: 'USD 3,500+' }
];

const destinationPathByValue = new Map(
  hubOrder.map((hub) => [hub.label.replace(/ Tours$/i, ''), hub.path])
);

function selectClassName() {
  return 'mt-2 h-[48px] w-full rounded-[16px] border border-navy/10 bg-[#fffdf7] px-4 lg:px-3 xl:px-6 text-sm lg:text-xs xl:text-sm font-extrabold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_16px_38px_rgba(11,27,43,0.06)] outline-none transition focus:border-gold focus:shadow-[0_0_0_4px_rgba(200,169,106,0.18),0_16px_38px_rgba(11,27,43,0.06)]';
}

export function HeroTourSearch() {
  const router = useRouter();
  const [destination, setDestination] = useState('Vietnam');
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState('all');
  const [duration, setDuration] = useState('all');
  const [budget, setBudget] = useState('all');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const path = destinationPathByValue.get(destination) || '/vietnam-tours/';
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (style !== 'all') params.set('style', style);
    if (duration !== 'all') params.set('duration', duration);
    if (budget !== 'all') params.set('budget', budget);
    const queryString = params.toString();
    router.push(`${path}${queryString ? `?${queryString}` : ''}#tours`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-6 w-full max-w-[1480px] overflow-hidden rounded-[24px] border border-pearl/45 bg-[radial-gradient(circle_at_10%_0%,rgba(200,169,106,0.30),transparent_30%),linear-gradient(135deg,#fffaf1_0%,#f1e3c7_52%,#fbf6eb_100%)] p-4 text-left text-navy shadow-[0_30px_90px_rgba(0,0,0,0.32)] md:p-5 lg:p-5"
      aria-label="Search tours"
    >
      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-[1.8fr_1.1fr_1.1fr_1.1fr_1.1fr_1.2fr] lg:gap-3 xl:gap-6">
        <div className="min-w-0">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-dark">Search tours</span>
          <div className="mt-2 flex h-[48px] items-center gap-3 rounded-[16px] border border-navy/10 bg-[#fffdf7] px-4 lg:px-3 xl:px-6 text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_18px_44px_rgba(11,27,43,0.08)] transition focus-within:border-gold focus-within:shadow-[0_0_0_4px_rgba(200,169,106,0.18),0_18px_44px_rgba(11,27,43,0.08)]">
            <Search className="h-[16px] w-[16px] shrink-0 text-gold-dark" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Route, city, style..."
              className="h-full w-full min-w-0 bg-transparent text-sm lg:text-xs xl:text-sm font-extrabold outline-none placeholder:text-navy/42"
            />
          </div>
        </div>
        <label className="block">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-dark">Country</span>
          <select value={destination} onChange={(event) => setDestination(event.target.value)} className={selectClassName()}>
            {bookingDestinations.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-dark">Style</span>
          <select value={style} onChange={(event) => setStyle(event.target.value)} className={selectClassName()}>
            <option value="all">Any style</option>
            {bookingStyles.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-dark">Duration</span>
          <select value={duration} onChange={(event) => setDuration(event.target.value)} className={selectClassName()}>
            {durationOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-dark">Budget</span>
          <select value={budget} onChange={(event) => setBudget(event.target.value)} className={selectClassName()}>
            {budgetOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[16px] border border-[#f6dfa2]/70 bg-[linear-gradient(135deg,#f2cf7a_0%,#c99a3d_52%,#a97725_100%)] px-6 lg:px-3 xl:px-6 text-[12px] lg:text-[10px] xl:text-[12px] font-black uppercase tracking-[0.18em] text-[#071421] shadow-[0_14px_32px_rgba(136,92,28,0.22),inset_0_1px_0_rgba(255,255,255,0.40)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(136,92,28,0.30),inset_0_1px_0_rgba(255,255,255,0.50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
          >
            <Search className="h-[14px] w-[14px] shrink-0" strokeWidth={2.8} />
            <span>Search Now</span>
          </button>
        </div>
      </div>
    </form>
  );
}
