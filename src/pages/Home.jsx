import HeroCarousel from '../components/HeroCarousel';
import HomeOverview from '../components/HomeOverview';
import FeaturedPractices from '../components/FeaturedPractices';
import PrincipalHighlight from '../components/PrincipalHighlight';
import CtaRibbon from '../components/CtaRibbon';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <HomeOverview />
      <FeaturedPractices />
      <PrincipalHighlight />
      <CtaRibbon />
    </div>
  );
}
