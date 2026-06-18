"use client";
import { useEffect, useRef } from "react";
interface MermaidChartProps { chart: string; }
export default function MermaidChart({ chart }: MermaidChartProps) {
  const ref = useRef<HTMLDivElement>(null);
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
        if (ref.current) {
          ref.current.innerHTML = svg;
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) { svgEl.style.background = "transparent"; svgEl.style.maxWidth = "100%"; }
        }
      } catch (e) {
        if (ref.current) ref.current.innerHTML = `<pre style="color:#ef4444;font-size:12px;padding:12px">${String(e)}</pre>`;
      }
    };
    render();
  }, [chart]);
  return <div ref={ref} className="my-6 rounded-xl p-4 overflow-x-auto" style={{ background: "#0a0a0f", border: "1px solid #2a2a3a" }} />;
}
