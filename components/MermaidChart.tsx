"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidChartProps {
  chart: string;
}

type DiagramLayout = "side" | "stack";

const ADVICE_ITEMS = [
  "図は本文を理解するための補助資料です",
  "先に全体の流れをつかむと、後続の解説が読みやすくなります",
  "分岐・入力・出力の関係に注目して確認しましょう",
];

export default function MermaidChart({ chart }: MermaidChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<DiagramLayout>("stack");

  useEffect(() => {
    if (!ref.current) return;

    const render = async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#0a0a0f",
          primaryColor: "#A855F7",
          primaryTextColor: "#f0f0f5",
          primaryBorderColor: "#2a2a3a",
          lineColor: "#606078",
          secondaryColor: "#1a1a24",
          tertiaryColor: "#111118",
          fontSize: "14px",
        },
      });

      const id = `mermaid-${Math.random().toString(36).slice(2)}`;

      try {
        const { svg } = await mermaid.render(id, chart.trim());

        if (!ref.current) return;

        ref.current.innerHTML = svg;

        const svgEl = ref.current.querySelector("svg");
        if (!svgEl) return;

        svgEl.style.background = "transparent";
        svgEl.style.maxWidth = "100%";
        svgEl.style.height = "auto";

        const viewBox = svgEl.getAttribute("viewBox");
        let width = Number(svgEl.getAttribute("width")?.replace("px", ""));
        let height = Number(svgEl.getAttribute("height")?.replace("px", ""));

        if (viewBox) {
          const [, , viewBoxWidth, viewBoxHeight] = viewBox.split(/\s+/).map(Number);
          if (Number.isFinite(viewBoxWidth) && Number.isFinite(viewBoxHeight)) {
            width = viewBoxWidth;
            height = viewBoxHeight;
          }
        }

        if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
          const ratio = width / height;
          // 横長の図だけ下にアドバイスを置く。
          // 縦長・正方形寄りの図は右側にアドバイスを置く。
          setLayout(ratio > 1.35 ? "stack" : "side");
        } else {
          setLayout("stack");
        }
      } catch (e) {
        if (ref.current) {
          ref.current.innerHTML = `<pre style="color:#ef4444;font-size:12px;padding:12px">${String(e)}</pre>`;
        }
        setLayout("stack");
      }
    };

    render();
  }, [chart]);

  return (
    <figure className={`diagram-card diagram-card--${layout}`}>
      <div className="diagram-frame" ref={ref} />
      <figcaption className="diagram-guide">
        <h4>💡 ワンポイントアドバイス</h4>
        <ul>
          {ADVICE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
