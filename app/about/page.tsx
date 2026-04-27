export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-ink dark:text-white">关于我</h1>
        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
          大家好，我是wen__xvn，这是我第一次制作个人网站。之前我一直把文章发在CSDN上，后来觉得这样不够好，就想自己搭建一个博客。这个博客是基于Next.js和Tailwind CSS开发的，使用markdown来编写文章内容。虽然功能还比较简单，但我会不断完善它，添加更多有用的功能和内容。希望大家喜欢这个博客，也欢迎大家加我的QQ/WX给我提建议！谢谢！
        </p>
      </article>
    </main>
  );
}
