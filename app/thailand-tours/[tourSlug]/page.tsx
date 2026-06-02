import { generateTourMetadata, generateTourStaticParams, RenderTourRoute } from '@/app/tour-page';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return generateTourStaticParams('thailand');
}

export async function generateMetadata({ params }: { params: Promise<{ tourSlug: string }> }) {
  const { tourSlug } = await params;
  return generateTourMetadata(tourSlug, 'thailand');
}

export default async function Page({ params }: { params: Promise<{ tourSlug: string }> }) {
  const { tourSlug } = await params;
  return <RenderTourRoute slug={tourSlug} hubKey="thailand" />;
}
