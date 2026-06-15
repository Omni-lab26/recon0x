import { MobileHero } from "@/components/home/MobileHero";
import { MobileStatsCarousel } from "@/components/home/MobileStatsCarousel";
import { MobileContinueList } from "@/components/home/MobileContinueList";
import { MobileChallengeCarousel } from "@/components/home/MobileChallengeCarousel";
import { MobileRankCard } from "@/components/home/MobileRankCard";
import { MobileCommunityCard } from "@/components/home/MobileCommunityCard";

export function MobileDashboard() {
  return (
    <div className="lg:hidden flex flex-col gap-8 pb-8">
      {/* 1. グリーティング + 今日のミッション */}
      <div className="px-4 pt-2">
        <MobileHero />
      </div>

      {/* 2. KPI 横スワイプ(3 枚) */}
      <MobileStatsCarousel />

      {/* 3. 続きから学習(縦 1 列) */}
      <MobileContinueList />

      {/* 4. チャレンジ(Netflix x Duolingo) */}
      <MobileChallengeCarousel />

      {/* 5. ランキング(Top 3 + 自分) */}
      <MobileRankCard />

      {/* 6. コミュニティ */}
      <MobileCommunityCard />
    </div>
  );
}
