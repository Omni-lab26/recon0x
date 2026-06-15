import { MobileRankHero } from "@/components/home/MobileRankHero";
import { MobileMissionCard } from "@/components/home/MobileMissionCard";
import { MobileStreakStrip } from "@/components/home/MobileStreakStrip";
import { MobileNextSkill } from "@/components/home/MobileNextSkill";
import { MobileCommunityActivity } from "@/components/home/MobileCommunityActivity";
import { MobileProfessionalToolkit } from "@/components/home/MobileProfessionalToolkit";

export function MobileDashboard() {
  return (
    <div className="lg:hidden flex flex-col gap-10 pb-8">
      {/* 1. HERO — viewport ~70% を支配 */}
      <MobileRankHero />

      {/* 2. CURRENT MISSION — 単一大型カード */}
      <MobileMissionCard />

      {/* 3. LEARNING STREAK */}
      <MobileStreakStrip />

      {/* 4. RECOMMENDED NEXT SKILL */}
      <MobileNextSkill />

      {/* 5. COMMUNITY ACTIVITY */}
      <MobileCommunityActivity />

      {/* 6. PROFESSIONAL TOOLKIT(Affiliate を業界標準セットアップとして自然統合) */}
      <MobileProfessionalToolkit />
    </div>
  );
}
