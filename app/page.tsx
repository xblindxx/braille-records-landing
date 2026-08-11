import { TopBanners } from "@/components/top-banners";
import { VslHero } from "@/components/vsl-hero";
import { CtaOptions } from "@/components/cta-options";
import { FollowBanner } from "@/components/follow-banner";
import { CatalogGrid } from "@/components/catalog-grid";
import { SiteFooter } from "@/components/site-footer";
import { releases } from "@/lib/releases";

export default function Home() {
  return (
    <main className="grain relative min-h-screen">
      <TopBanners />
      <VslHero releaseCount={releases.length} />
      <CtaOptions />
      <FollowBanner />
      <CatalogGrid />
      <SiteFooter />
    </main>
  );
}
