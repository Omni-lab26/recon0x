interface SparklineProps {
  series: number[];
  color?: string;
  fill?: boolean;
  height?: number;
  width?: number;
  invert?: boolean;
  showLast?: boolean;
}

/**
 * Tiny inline SVG sparkline. Reusable across pages for "alive" data feel.
 */
export function Sparkline({
  series,
  color = "var(--g)",
  fill = true,
  height = 28,
  width = 100,
  invert = false,
  showLast = true,
}: SparklineProps) {
  if (series.length === 0) return null;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const step = width / (series.length - 1);
  const points = series
    .map((v, i) => {
      const norm = (v - min) / range;
      const y = invert ? norm * (height - 4) + 2 : (1 - norm) * (height - 4) + 2;
      return `${i * step},${y}`;
    })
    .join(" ");
  const lastIdx = series.length - 1;
  const lastNorm = (series[lastIdx] - min) / range;
  const lastY = invert
    ? lastNorm * (height - 4) + 2
    : (1 - lastNorm) * (height - 4) + 2;

  const gradId = `spark-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height }}
    >
      {fill && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity="0.3" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            points={`${points} ${width},${height} 0,${height}`}
            fill={`url(#${gradId})`}
          />
        </>
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {showLast && <circle cx={width} cy={lastY} r="2" fill={color} />}
    </svg>
  );
}
