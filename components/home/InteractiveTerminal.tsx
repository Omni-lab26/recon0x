"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

const COMMANDS: Record<string, string[]> = {
  whoami: ["hacker"],
  "ls /skills": [
    "web_exploitation  reversing    crypto",
    "network          forensics    osint",
  ],
  ls: ["articles  ctf  lab  learn  tools"],
  pwd: ["/home/hacker"],
  help: ["利用可能: whoami, ls /skills, pwd, id, uname, date, clear, help"],
  clear: ["__CLEAR__"],
  uname: ["Linux recon0x 6.1.0-kali #1 SMP PREEMPT Kali"],
  id: ["uid=1337(hacker) gid=1337(hacker) groups=1337(hacker),sudo"],
  date: [new Date().toLocaleString("ja-JP")],
  cat: ["Usage: cat <file>"],
  echo: ["(echo に続けて文字を入力)"],
};

type Line =
  | { type: "input"; text: string }
  | { type: "output"; text: string; color?: string };

const INITIAL: Line[] = [
  { type: "input", text: "whoami" },
  { type: "output", text: "hacker", color: "var(--c)" },
  { type: "input", text: "ls /skills" },
  { type: "output", text: "web_exploitation  reversing    crypto" },
  { type: "output", text: "network          forensics    osint" },
];

export function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const run = (cmd: string) => {
    if (!cmd) return;
    const newHist = [cmd, ...history].slice(0, 50);
    setHistory(newHist);
    setHistIdx(-1);

    const lower = cmd.toLowerCase();
    let result = COMMANDS[lower];

    // echo handling
    if (!result && lower.startsWith("echo ")) {
      result = [cmd.slice(5)];
    }

    if (result?.[0] === "__CLEAR__") {
      setLines([]);
      setInput("");
      return;
    }

    const next: Line[] = [...lines, { type: "input", text: cmd }];
    if (result) {
      result.forEach((r) => next.push({ type: "output", text: r }));
    } else {
      next.push({
        type: "output",
        text: `bash: ${cmd}: command not found`,
        color: "var(--r)",
      });
    }
    setLines(next);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // 矢印・スペースのページスクロールを完全にブロック
    if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
    e.stopPropagation();

    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key === "ArrowUp") {
      const next = Math.min(histIdx + 1, history.length - 1);
      if (next >= 0) {
        setHistIdx(next);
        setInput(history[next] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      // 普通の文字(スペース含む)
      setInput((prev) => prev + e.key);
    }
  };

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => rootRef.current?.focus()}
      className="rounded-[11px] border overflow-hidden flex flex-col cursor-text outline-none"
      style={{
        background: "var(--terminal-bg)",
        height: "100%",
        borderColor: focused
          ? "rgba(168,85,247,0.4)"
          : "rgba(139,92,246,0.14)",
        boxShadow: focused
          ? "0 0 16px rgba(168,85,247,0.2)"
          : undefined,
        transition: "border-color 150ms, box-shadow 150ms",
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5 border-b flex-shrink-0"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderColor: "rgba(139,92,246,0.1)",
        }}
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-[9.5px] text-t3 ml-1">
          recon@hacklab:~
        </span>
        <span
          className="font-mono text-[9px] ml-auto"
          style={{ color: focused ? "var(--p)" : "var(--t3)" }}
        >
          {focused ? "● 入力中" : "クリックして入力"}
        </span>
      </div>

      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-[10.5px] leading-[1.75]"
        style={{ overscrollBehavior: "contain" }}
      >
        {lines.map((l, i) =>
          l.type === "input" ? (
            <div key={i}>
              <span className="text-brand-green">recon@lab</span>
              <span style={{ color: "var(--p)" }}>:~$</span>{" "}
              <span className="text-t1 whitespace-pre">{l.text}</span>
            </div>
          ) : (
            <div
              key={i}
              className="whitespace-pre"
              style={{ color: l.color ?? "var(--t2)" }}
            >
              {l.text}
            </div>
          )
        )}

        <div>
          <span className="text-brand-green">recon@lab</span>
          <span style={{ color: "var(--p)" }}>:~$</span>{" "}
          <span className="text-t1 whitespace-pre">{input}</span>
          <span
            className="inline-block w-1.5 h-3 ml-px align-middle"
            style={{
              background: "var(--p)",
              animation: focused ? "pulse-soft 1s infinite" : "none",
              opacity: focused ? 1 : 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
