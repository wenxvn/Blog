"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import clsx from "clsx";

const nav = [
  { href: "/", label: "首页" },
  { href: "/notes", label: "算法笔记" },
  { href: "/search", label: "搜索" },
  { href: "/about", label: "关于我" }
];

export function TopNav() {
  const pathname = usePathname();
  const { dark, toggle } = useTheme();
  const isHome = pathname === "/";

  return (
    <header
      className={clsx(
        "top-0 z-40 backdrop-blur transition",
        isHome
          ? "fixed w-full border-b border-white/10 bg-slate-950/10"
          : "sticky border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3">
          <span
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-lg text-lg font-black shadow-sm",
              isHome ? "bg-white/20 text-white" : "bg-slate-100 text-ink dark:bg-slate-800 dark:text-white"
            )}
          >
            W
          </span>
          <span className={clsx("text-xl font-bold", isHome ? "text-white" : "text-ink dark:text-white")}>
            wen__xvn 的个人博客
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                pathname === item.href
                  ? isHome
                    ? "bg-white/20 text-white"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : isHome
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className={clsx(
              "ml-2 rounded-lg border px-3 py-2 text-sm",
              isHome ? "border-white/20 text-white hover:bg-white/10" : "border-slate-200 dark:border-slate-700"
            )}
            aria-label="切换主题"
          >
            {dark ? "浅色" : "深色"}
          </button>
        </div>
      </nav>
    </header>
  );
}
