import type { Metadata } from 'next';
import { HubPage } from '@/components/hub-page';
import { hubs } from '@/lib/fallback-data';
import { getSiteContent } from '@/lib/site-content';
import { resolveStaticPagesContent } from '@/lib/site-content-schema';
import { absoluteUrl, generateHreflangAlternates } from '@/lib/seo';

const PAGE_PATH = '/laos-tours/';

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();
  const override = resolveStaticPagesContent(siteContent).hubs['laos'] || {};
  return {
    title: override.title || hubs['laos'].title,
    description: override.intro || hubs['laos'].intro,
    alternates: { canonical: absoluteUrl(PAGE_PATH), languages: generateHreflangAlternates(PAGE_PATH) }
  };
}

export default function Page() {
  return <HubPage hubKey="laos" />;
}

