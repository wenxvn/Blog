"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 首页轮播背景图：把图片放到 public/images/ 目录下，然后在这里修改路径。
// 你也可以直接用自己的 4 张图片覆盖这些同名 svg 文件。
const backgroundImages = [
  "/images/A.jpg",
  "/images/B.jpg",
  "/images/C.jpg",
  "/images/D.jpg"
];

// 个人头像：把头像放到 public/images/ 目录下，然后在这里修改路径。
// 你也可以直接用自己的头像覆盖 public/images/avatar.svg。
const avatarImage = "/images/2.jpg";

const profileLinks = [
  { label: "微信", value: "wen__xvn" },
  { label: "QQ", value: "1055602033" },
  {
    label: "CSDN",
    value: "https://blog.csdn.net/2401_88089822?spm=1010.2135.3001.5343",
    href: "https://blog.csdn.net/2401_88089822?spm=1010.2135.3001.5343"
  },
  {
    label: "GitHub",
    value: "https://github.com/wenxvn?tab=repositories",
    href: "https://github.com/wenxvn?tab=repositories"
  }
];

type HomeHeroProps = {
  articleCount: number;
  categoryCount: number;
};

export function HomeHero({ articleCount, categoryCount }: HomeHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % backgroundImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative -mt-16 flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-24 text-white">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === activeIndex ? 1 : 0
          }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/70 to-transparent" />

      <section className="relative z-10 w-full max-w-4xl rounded-[2rem] border border-white/20 bg-white/15 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white/45 bg-white/20 shadow-xl sm:h-32 sm:w-32">
          <img src={avatarImage} alt="wen__xvn 的头像" className="h-full w-full object-cover" />
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">wen__xvn</h1>

        <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/15 bg-white/15 px-6 py-5">
            <div className="text-3xl font-black">{categoryCount}</div>
            <div className="mt-1 text-sm text-white/75">分类栏目</div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/15 px-6 py-5">
            <div className="text-3xl font-black">{articleCount}</div>
            <div className="mt-1 text-sm text-white/75">文章个数</div>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-sm sm:text-base">
          {profileLinks.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/15 bg-slate-950/25 px-5 py-4 text-left">
              <span className="font-semibold text-white/80">{item.label}：</span>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer" className="break-all text-cyan-100 hover:text-white">
                  {item.value}
                </a>
              ) : (
                <span className="break-all text-white">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <Link
            href="/notes"
            className="rounded-full bg-white px-10 py-4 text-base font-bold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            开始
          </Link>
        </div>
      </section>
    </main>
  );
}
