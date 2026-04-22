# wen__xvn Astro Personal Blog

这是一个按你的需求生成的 **Astro 最小个人博客**：

- 顶部是一整屏封面
- 有背景图和头像（当前为占位图）
- 首页展示：
  - `wen__xvn的个人博客`
  - GitHub / CSDN / QQ / 微信
- 向下滚动进入博客主区域
- 左侧是文档站式折叠侧边栏：
  - 大板块
  - 小板块
  - Markdown 文章
- 右侧直接显示文章内容
- 首页默认显示排在最前面的第一篇文章

---

## 1. 启动项目

```bash
npm install
npm run dev
```

浏览器打开本地地址即可。

---

## 2. 如何替换背景图和头像

当前使用的是占位图：

- 背景图：`public/images/hero-bg.svg`
- 头像：`public/images/avatar.svg`

你有两种替换方式。

### 方式 A：直接替换同名文件

把你自己的图片文件改成相同名字：

- `hero-bg.svg` 或 `hero-bg.jpg` / `hero-bg.png`
- `avatar.svg` 或 `avatar.jpg` / `avatar.png`

然后覆盖到：

```text
public/images/
```

如果你继续使用相同文件名，就不需要改代码。

---

### 方式 B：换文件名后改引用路径

如果你换成了别的名字，比如：

- `my-cover.jpg`
- `my-avatar.png`

那要改两个地方。

#### 改背景图
打开：

```text
src/styles/global.css
```

找到：

```css
url('/images/hero-bg.svg')
```

改成：

```css
url('/images/my-cover.jpg')
```

#### 改头像
打开：

```text
src/components/Hero.astro
```

找到：

```astro
<img src="/images/avatar.svg" alt="avatar placeholder" />
```

改成：

```astro
<img src="/images/my-avatar.png" alt="my avatar" />
```

---

## 3. 如何新增文章

你只需要在这些目录下新增 `.md` 文件：

```text
src/content/blog/leetcode/simulate/
src/content/blog/leetcode/search/
src/content/blog/tianti/L1/
src/content/blog/tianti/L2/
src/content/blog/tianti/L3/
```

示例：

```md
---
title: 我的新文章
description: 这里写简介
section: leetcode
category: simulate
order: 6
pubDate: 2026-04-22
---

## 正文标题

这里写正文内容。
```

### frontmatter 字段说明

- `title`：文章标题
- `description`：文章简介
- `section`：大板块
- `category`：小板块
- `order`：排序，数字越小越靠前
- `pubDate`：发布日期

---

## 4. 如何新增或删除板块

当前板块配置在：

```text
src/components/sidebarConfig.ts
```

你会看到：

```ts
export const sidebarConfig = {
  leetcode: {
    label: '力扣',
    categories: {
      simulate: '模拟题',
      search: '搜索题',
    },
  },
  tianti: {
    label: '天梯赛',
    categories: {
      L1: 'L1',
      L2: 'L2',
      L3: 'L3',
    },
  },
} as const;
```

### 新增小板块
比如给力扣新增 `dp`：

1. 改 `sidebarConfig.ts`
2. 在 `src/content/blog/leetcode/dp/` 新建目录
3. 改 `src/content.config.ts` 里的 `category` 枚举，加入 `dp`

### 新增大板块
比如新增 `acm`：

1. 改 `sidebarConfig.ts`
2. 新建 `src/content/blog/acm/` 相关目录
3. 改 `src/content.config.ts` 里的 `section` 枚举，加入 `acm`

### 删除板块
删掉对应目录，并同步删除 `sidebarConfig.ts` 和 `src/content.config.ts` 里的配置即可。

---

## 5. 首页默认显示最前面一篇文章

首页会读取所有文章，并按下面规则排序：

1. `order` 小的在前
2. 如果 `order` 相同，日期新的在前

所以你想让哪篇文章最先显示，就把它的 `order` 设成最小，例如 `1`。

---

## 6. 发布到 Vercel

这个项目是 Astro 静态站，适合直接部署到 Vercel。

常见流程：

1. 上传到 GitHub
2. 在 Vercel 导入仓库
3. 自动部署
4. 获得一个 `xxx.vercel.app` 地址
5. 需要的话再绑定你自己的域名

---

## 7. 项目结构

```text
astro-personal-blog/
├─ public/
│  └─ images/
├─ src/
│  ├─ components/
│  ├─ content/
│  ├─ layouts/
│  ├─ lib/
│  ├─ pages/
│  └─ styles/
├─ astro.config.mjs
├─ package.json
└─ README.md
```


---

## 8. 这次布局修改了什么

现在文章目录已经改成了**贴在页面最左边缘**的独立导航栏，不再是放在主体内容区里面的普通左栏。

新的结构是：

- 最左侧：固定贴边目录栏
- 右侧：文章正文区域
- 首页顶部仍然是一整屏封面
- 向下滚动后进入文档站布局

如果你还想继续微调，我建议下一步常见可改的是：

- 让左侧目录栏更窄或更宽
- 给当前分类增加更明显的蓝色背景
- 给展开动画做得更顺滑
- 让左侧目录栏在桌面端固定不动
