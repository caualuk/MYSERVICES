"use client";

import React, { useEffect, useRef, useState } from "react";

type Tab = { key: string; label: string; count?: number; onChange?: (role: string) => void };

export default function FilterTab({ onChange }) {
  const tabs: Tab[] = [
    { key: "CLIENT", label: "Cliente" },
    { key: "EMPLOYEE", label: "Funcionário" },
  ];

  const [active, setActive] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const activeEl = refs.current[active];
      if (!container || !activeEl) return;

      const cRect = container.getBoundingClientRect();
      const aRect = activeEl.getBoundingClientRect();

      const left = aRect.left - cRect.left;
      const width = aRect.width;

      setIndicator({ left, width });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActive((s) => Math.min(s + 1, tabs.length - 1));
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      setActive((s) => Math.max(s - 1, 0));
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Filtros"
      className="relative grid gap-2 p-2 m-1 rounded-xl bg-[#e7e5e5]"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      {/* Indicador absoluto (posicionado via medidas para ficar exato) */}
      <div
        aria-hidden
        className="absolute top-1 bottom-1 rounded-lg bg-indigo-600 shadow transition-all duration-300"
        style={{ left: indicator.left, width: indicator.width }}
      />

      {tabs.map((t, i) => (
        <button
          key={t.key}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="tab"
          aria-selected={active === i}
          onClick={() => {
            setActive(i);
            onChange(t.key);
          }}
          onKeyDown={onKey}
          tabIndex={active === i ? 0 : -1}
          className={`relative z-10 w-full flex items-center justify-center gap-2 rounded-lg py-1 text-sm
            border-none
            outline-none
            focus:outline-none
            focus-visible:outline-none
            focus:ring-0
            cursor-pointer
            ${active === i ? "text-white" : "text-gray-600"}`}
        >
          <span className="select-none">{t.label}</span>

          {typeof t.count === "number" && (
            <span
              className={`inline-flex min-w-[18px] items-center justify-center rounded-full px-[6px] text-xs font-medium h-[18px]
                ${
                  active === i
                    ? "bg-gray-300 text-black"
                    : "bg-gray-400 text-white"
                }`}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
