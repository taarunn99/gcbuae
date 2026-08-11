"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { searchSite } from "@/config/search-index";
import { cn } from "@/lib/utils";

/**
 * The live site search: filters the static index (all pages + all 128
 * shades) on every keystroke, grouped results, arrow-key + Enter
 * navigation. Mounted inside the header's drop-down panel; the panel's
 * open state is passed in so focus and tab order behave.
 */
export function SiteSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    // Reset happens on the way out (event handler, not an effect —
    // the lint rule about setState-in-effect stands).
    setQuery("");
    setHighlight(0);
    onClose();
  };

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[highlight] ?? results[0];
      if (target) go(target.href);
    } else if (event.key === "Escape") {
      close();
    }
  };

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex items-center gap-4"
      >
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setHighlight(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search shades, materials, pages…"
          aria-label="Search the site"
          autoComplete="off"
          tabIndex={open ? 0 : -1}
          className="placeholder:text-muted/70 focus:border-accent w-full border-b bg-transparent py-3 text-lg outline-none"
        />
        <button
          type="button"
          aria-label="Close search"
          tabIndex={open ? 0 : -1}
          onClick={close}
          className="label-gcb p-2 opacity-70 hover:opacity-100"
        >
          Close
        </button>
      </form>

      {query.trim().length >= 2 ? (
        results.length > 0 ? (
          <ul className="mt-4 max-h-[50vh] divide-y divide-current/10 overflow-y-auto">
            {results.map((r, i) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  tabIndex={open ? 0 : -1}
                  onClick={close}
                  onPointerEnter={() => setHighlight(i)}
                  className={cn(
                    "flex items-baseline justify-between gap-4 px-2 py-3 transition-colors",
                    i === highlight && "bg-warm-black text-ink",
                  )}
                >
                  <span className="min-w-0">
                    <span className="font-display block truncate text-lg leading-tight">
                      {r.label}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block truncate text-xs",
                        i === highlight ? "text-ink/70" : "text-muted",
                      )}
                    >
                      {r.sub}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "label-gcb shrink-0 text-[0.6rem]",
                      i === highlight ? "text-ink/60" : "text-muted",
                    )}
                  >
                    {r.group}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mt-4 text-sm">
            Nothing found for &ldquo;{query.trim()}&rdquo; — try a shade name, a
            material, or a colour.
          </p>
        )
      ) : (
        <p className="text-muted mt-3 text-xs">
          Try &ldquo;Calacatta&rdquo;, &ldquo;terrazzo&rdquo;,
          &ldquo;Microban&rdquo;, or any of the 128 shades.
        </p>
      )}
    </div>
  );
}
