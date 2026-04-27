# wen__xvn 个人博客维护说明

这份说明按当前项目结构编写，路径、字段名和修改位置均对应项目中的实际文件。

## 1. 项目基本信息

这是一个基于 Next.js 14、React 18、TypeScript、Tailwind CSS 的静态博客项目。

常用命令：

```bash
npm install
npm run dev
npm run build
npm run start
```

- 本地开发：`npm run dev`
- 本地检查生产构建：`npm run build`
- 本地启动生产版本：`npm run start`
- 部署到 Vercel：把完整项目上传到 GitHub 后，在 Vercel 中导入仓库即可

`.gitignore` 当前需要保留以下内容：

```txt
node_modules
.next
out
.vercel
.env*.local
.DS_Store
```

这些目录和文件不应该提交到 GitHub。

## 2. 题解 Markdown 放在哪里

所有题解文章都放在项目根目录下的 `posts/` 文件夹中。

当前已有目录如下：

```txt
posts/
├── contest/       比赛记录
├── dp/            DP
├── graph/         图论
├── leetcode/      力扣
├── luogu/         洛谷
├── niuke/         牛客
└── pta/           天梯赛
```

新增题解时，把 `.md` 文件放进对应目录即可。

例如：

```txt
posts/leetcode/two-sum.md
posts/luogu/P1001.md
posts/dp/knapsack.md
posts/graph/dijkstra.md
```

文件名会参与生成文章路径。比如：

```txt
posts/leetcode/two-sum.md
```

会生成文章 slug：

```txt
leetcode/two-sum
```

## 3. 每篇文章的标准写法

每篇 `.md` 文件开头必须写 frontmatter，也就是用 `---` 包起来的文章信息。

标准模板如下：

```md
---
title: "文章标题"
date: "2025-01-03"
tags: ["力扣", "哈希表", "数组"]
category: "力扣"
problemUrl: "https://leetcode.cn/problems/two-sum/"
---

## 思路讲解

这里写题解正文。

## C++ 代码

```cpp
// 这里写代码
```
```

字段说明：

| 字段 | 是否必填 | 作用 |
|---|---:|---|
| `title` | 是 | 文章标题，显示在左侧目录和文章详情中 |
| `date` | 是 | 文章日期，格式使用 `YYYY-MM-DD` |
| `tags` | 是 | 标签数组，用英文逗号分隔多个标签 |
| `category` | 是 | 所属栏目，必须和左侧大栏目名称一致 |
| `problemUrl` | 否 | 题目链接；填写后文章标题区域会显示“题目链接” |

实际项目中已有示例：

```md
---
title: "1. 两数之和"
date: "2025-01-03"
tags: ["力扣", "哈希表", "数组"]
category: "力扣"
problemUrl: "https://leetcode.cn/problems/two-sum/"
---
```

## 4. 如何注明每篇文章的标签

在文章开头的 `tags` 字段中写标签。

单个标签：

```md
tags: ["DP"]
```

多个标签：

```md
tags: ["力扣", "哈希表", "数组"]
```

标签会出现在文章详情页标题区域，也会被搜索页使用。

搜索页读取的字段包括：

```txt
title、category、tags、excerpt、content
```

因此文章标题、栏目、标签、正文内容都可以被搜索到。

## 5. 如何新建栏目

新建栏目需要做两件事。

### 第一步：在 `posts/` 下新建目录

例如要新增“贪心”栏目，可以新建：

```txt
posts/greedy/
```

然后把文章放进去：

```txt
posts/greedy/example.md
```

文章 frontmatter 中的 `category` 要写成栏目中文名：

```md
---
title: "贪心示例题"
date: "2025-02-01"
tags: ["贪心"]
category: "贪心"
problemUrl: ""
---
```

### 第二步：在 `lib/posts.ts` 中维护栏目顺序

打开：

```txt
lib/posts.ts
```

找到：

```ts
const categoryOrder = [
  "洛谷",
  "力扣",
  "天梯赛",
  "牛客",
  "比赛记录",
  "DP",
  "图论",
  "贪心",
  "数组",
  "链表",
  "哈希表",
  "字符串",
  "双指针法",
  "栈与队列",
  "二叉树",
  "回溯算法"
];
```

把新栏目中文名加到这个数组中即可。

栏目显示顺序由 `categoryOrder` 决定。排在前面的栏目会显示在左侧目录更靠上的位置。

注意：目录文件夹名不要求和中文栏目名一致，真正决定栏目名称的是每篇文章 frontmatter 里的 `category` 字段。

例如文件可以放在：

```txt
posts/greedy/example.md
```

但文章中必须写：

```md
category: "贪心"
```

这样左侧目录才会显示在“贪心”栏目下。

## 6. 如何删除栏目

删除栏目也分两步。

### 第一步：删除或移动该栏目的文章

例如要删除“牛客”栏目，删除或移走：

```txt
posts/niuke/
```

或者把里面文章的 `category` 改成其他栏目。

### 第二步：从 `lib/posts.ts` 的 `categoryOrder` 删除栏目名

打开：

```txt
lib/posts.ts
```

从 `categoryOrder` 数组中删除对应中文栏目名。

例如删除：

```ts
"牛客",
```

只从 `categoryOrder` 删除栏目名但不删除文章时，该栏目的文章仍然会被读取，项目会在 `categoryOrder` 后面自动追加这个栏目。原因是 `getGroupedPosts()` 中有如下逻辑：

```ts
if (!map.has(post.category)) map.set(post.category, []);
```

所以要彻底删除栏目，必须同时处理文章文件或文章中的 `category` 字段。

## 7. 如何调整栏目顺序

栏目顺序只需要改：

```txt
lib/posts.ts
```

修改 `categoryOrder` 数组中栏目名称的排列顺序即可。

例如想让“DP”排在“力扣”前面，就把：

```ts
"DP",
```

移动到：

```ts
"力扣",
```

前面。

## 8. “算法笔记”页面在哪里改

算法笔记页面入口文件是：

```txt
app/notes/page.tsx
```

当前逻辑是读取所有文章并传给左侧阅读器组件：

```ts
import { ReaderShell } from "@/components/reader-shell";
import { getGroupedPosts } from "@/lib/posts";

export default function NotesPage() {
  const groups = getGroupedPosts();
  return <ReaderShell groups={groups} />;
}
```

左侧目录、文章阅读区域、可拖拽侧边栏都在这个文件中维护：

```txt
components/reader-shell.tsx
```

侧边栏默认宽度、最小宽度、最大宽度在 `components/reader-shell.tsx` 中：

```ts
const MIN_SIDEBAR_WIDTH = 220;
const MAX_SIDEBAR_WIDTH = 420;
const [sidebarWidth, setSidebarWidth] = useState(260);
```

如果要调整默认左侧栏宽度，改 `260`。

如果要调整拖拽范围，改：

```ts
MIN_SIDEBAR_WIDTH
MAX_SIDEBAR_WIDTH
```

## 9. “关于我”页面在哪里改

关于我页面文件是：

```txt
app/about/page.tsx
```

当前页面正文在这个文件中直接写死。要修改“关于我”的内容，直接编辑 `app/about/page.tsx` 里的文字即可。

当前核心内容是：

```tsx
你好，我是 wen__xvn。这个网站用于记录算法学习、比赛复盘和题解笔记。
你可以在 <code>posts</code> 目录中继续添加 Markdown 文件，网站会自动生成左侧分类目录和搜索索引。
```

如果要把“关于我”改成更完整的个人介绍，就修改这个文件中的 `<p>` 内容。

## 10. 首页在哪里改

首页入口文件是：

```txt
app/page.tsx
```

轮播首页组件是：

```txt
components/home-hero.tsx
```

首页文章个数和分类栏目个数在 `app/page.tsx` 中自动统计：

```ts
const posts = getAllPosts();
const categoryCount = new Set(posts.map((post) => post.category)).size;

return <HomeHero articleCount={posts.length} categoryCount={categoryCount} />;
```

因此新增或删除文章后，首页显示的文章个数和分类栏目个数会自动变化。

## 11. 首页 4 张轮播背景图在哪里替换

背景图路径在：

```txt
components/home-hero.tsx
```

找到：

```ts
const backgroundImages = [
  "/images/home-carousel-1.svg",
  "/images/home-carousel-2.svg",
  "/images/home-carousel-3.svg",
  "/images/home-carousel-4.svg"
];
```

如果你的图片是 JPG，推荐把图片放到：

```txt
public/images/home-carousel-1.jpg
public/images/home-carousel-2.jpg
public/images/home-carousel-3.jpg
public/images/home-carousel-4.jpg
```

然后把 `components/home-hero.tsx` 中的数组改成：

```ts
const backgroundImages = [
  "/images/home-carousel-1.jpg",
  "/images/home-carousel-2.jpg",
  "/images/home-carousel-3.jpg",
  "/images/home-carousel-4.jpg"
];
```

轮播间隔在同一个文件中：

```ts
}, 5000);
```

`5000` 表示每 5 秒切换一次。要改成 3 秒，就改成 `3000`。

你的背景图分辨率是 `758 * 426`，可以直接放进 `public/images/` 使用。

## 12. 首页头像在哪里替换

头像路径也在：

```txt
components/home-hero.tsx
```

找到：

```ts
const avatarImage = "/images/avatar.svg";
```

如果你的头像是 JPG，推荐放到：

```txt
public/images/avatar.jpg
```

然后改成：

```ts
const avatarImage = "/images/avatar.jpg";
```

## 13. 首页个人信息在哪里改

首页个人信息在：

```txt
components/home-hero.tsx
```

找到：

```ts
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
```

修改微信、QQ、CSDN、GitHub 就改这里。

有 `href` 的项目会显示成可点击链接；没有 `href` 的项目会显示成普通文字。

## 14. 顶部导航栏在哪里改

顶部导航栏文件是：

```txt
components/top-nav.tsx
```

导航项在：

```ts
const nav = [
  { href: "/", label: "首页" },
  { href: "/notes", label: "算法笔记" },
  { href: "/search", label: "搜索" },
  { href: "/about", label: "关于我" }
];
```

网站标题在同一个文件中：

```tsx
wen__xvn 的个人博客
```

如果以后要改博客名，就改这里。

## 15. 搜索页在哪里改

搜索页入口文件：

```txt
app/search/page.tsx
```

搜索组件：

```txt
components/search-client.tsx
```

搜索使用 `Fuse.js`，搜索范围在 `components/search-client.tsx` 中：

```ts
keys: ["title", "category", "tags", "excerpt", "content"]
```

这表示标题、栏目、标签、摘要、正文都会被搜索。

## 16. 刷题统计在哪里改

刷题统计组件是：

```txt
components/practice-tracker.tsx
```

基础热力图数据文件是：

```txt
data/heatmap.json
```

`components/practice-tracker.tsx` 中新增的刷题记录会保存到浏览器本地 `localStorage`，key 是：

```ts
const STORAGE_KEY = "wen__xvn-practice-records";
```

注意：这里的记录是保存在当前浏览器里的，不会自动写回 GitHub，也不会自动同步到 Vercel。换浏览器或换电脑后，本地新增记录不会跟着过去。

如果要维护一份固定展示的刷题热力图数据，可以手动编辑：

```txt
data/heatmap.json
```

## 17. 文章读取逻辑在哪里

文章读取逻辑在：

```txt
lib/posts.ts
```

它会递归扫描：

```txt
posts/
```

只读取后缀为 `.md` 的文件。

核心逻辑：

```ts
const postsDirectory = path.join(process.cwd(), "posts");
```

```ts
return stat.isDirectory() ? walk(file) : file.endsWith(".md") ? [file] : [];
```

也就是说：

- 可以在 `posts/` 下继续建多级目录
- 只有 `.md` 文件会被读取
- 非 `.md` 文件不会作为文章显示

## 18. 部署到 GitHub 和 Vercel 的注意事项

提交到 GitHub 时，必须提交这些内容：

```txt
app/
components/
data/
lib/
posts/
public/
package.json
package-lock.json 或 pnpm-lock.yaml 或 yarn.lock
next.config.mjs
postcss.config.mjs
tailwind.config.ts
tsconfig.json
.gitignore
```

不要提交：

```txt
node_modules/
.next/
.vercel/
.env*.local
.DS_Store
```

Vercel 部署设置使用默认即可：

```txt
Framework Preset: Next.js
Build Command: npm run build
Output Directory: 不需要手动填写
Install Command: npm install
```

每次新增文章后，提交到 GitHub，Vercel 会重新构建，文章会自动出现在网站中。

## 19. 本地第一次点击页面慢的原因

`npm run dev` 是开发模式。第一次打开某个页面时，Next.js 会临时编译该页面，所以第一次点击“算法笔记”“搜索”“关于我”可能会慢。

生产环境不会按这种方式临时编译。部署到 Vercel 前，可以用下面命令检查生产构建：

```bash
npm run build
npm run start
```

`npm run build` 成功后，再部署到 Vercel。

## 20. 新增一篇题解的完整流程

以新增一篇力扣题解为例。

第一步，新建文件：

```txt
posts/leetcode/example-problem.md
```

第二步，写 frontmatter：

```md
---
title: "示例题目"
date: "2025-03-01"
tags: ["力扣", "双指针"]
category: "力扣"
problemUrl: "https://leetcode.cn/"
---
```

第三步，写正文：

```md
## 思路讲解

这里写思路。

## C++ 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
```
```

第四步，本地运行检查：

```bash
npm run dev
```

第五步，提交到 GitHub，等待 Vercel 自动部署。

## 21. 修改文件后优先检查什么

修改文章或栏目后，优先检查：

```bash
npm run build
```

如果构建失败，重点检查：

1. Markdown 文件开头的 `---` 是否成对出现
2. `tags` 是否写成数组格式，例如 `["力扣", "数组"]`
3. `category` 是否是字符串，例如 `"力扣"`
4. 代码块的三个反引号是否闭合
5. 图片路径是否放在 `public/images/` 下，并且代码中的路径以 `/images/` 开头

