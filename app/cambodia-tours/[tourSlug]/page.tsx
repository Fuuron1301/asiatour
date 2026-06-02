import { generateTourMetadata, generateTourStaticParams, RenderTourRoute } from '@/app/tour-page';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return generateTourStaticParams('cambodia');
}

export async function generateMetadata({ params }: { params: Promise<{ tourSlug: string }> }) {
  const { tourSlug } = await params;
  return generateTourMetadata(tourSlug, 'cambodia');
}

export default async function Page({ params }: { params: Promise<{ tourSlug: string }> }) {
  const { tourSlug } = await params;
  return <RenderTourRoute slug={tourSlug} hubKey="cambodia" />;
}
