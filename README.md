# 博客使用说明（README）

本项目基于 **Astro + Markdown + 自动分栏脚本**，用于搭建个人博客。

---

# 一、日常使用你只需要记住三件事

1. **新增栏目 / 删除栏目 → 改一个配置文件**
2. **新增文章 → 新建一个 md 文件**
3. **改完栏目后一定要运行命令同步**

---

# 二、新增栏目（最重要）

## 步骤 1：修改配置文件

打开：

```
src/config/blogStructure.ts
```

例如新增一个栏目 `acm`：

```ts
export const blogStructure = {
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
  acm: {
    label: '算法竞赛',
    categories: {
      graph: '图论',
      dp: '动态规划',
    },
  },
} as const;
```

---

## 步骤 2：执行同步命令

```bash
npm run sync:blog
```

---

## 会自动完成：

- 更新侧边栏
- 更新分类校验
- 创建目录：

```
src/content/blog/acm/graph/
src/content/blog/acm/dp/
```

---

# 三、删除栏目

## 步骤 1：删除配置

在 `blogStructure.ts` 中删掉对应内容

例如删除 `acm`：

```ts
// 直接删掉 acm 整段
```

---

## 步骤 2：运行同步

```bash
npm run sync:blog
```

---

## 步骤 3（手动）

删除对应目录：

```
src/content/blog/acm/
```

⚠️ 脚本不会自动删目录（防止误删数据）

---

# 四、新增文章

## 在对应目录创建 md 文件

例如：

```
src/content/blog/leetcode/simulate/01-example.md
```

---

## 内容格式

```md
---
title: 文章标题
description: 文章简介
section: leetcode
category: simulate
order: 1
pubDate: 2026-04-22
---

正文内容
```

---

## 字段说明

| 字段 | 说明 |
|------|------|
| title | 标题 |
| description | 简介 |
| section | 大栏目 |
| category | 小栏目 |
| order | 排序（越小越靠前） |
| pubDate | 日期 |

---

# 五、删除文章

直接删除 `.md` 文件即可：

```
rm xxx.md
```

页面会自动更新。

---

# 六、首页显示哪篇文章？

规则：

1. `order` 最小的优先
2. 相同 order → 最新日期优先

---

# 七、图片替换

图片位置：

```
public/images/
```

## 替换背景图

文件名：

```
hero-bg.jpg
```

## 替换头像

文件名：

```
avatar.jpg
```

⚠️ 注意：

- 文件名必须完全一致
- 区分大小写
- jpg / png 后缀要对应

---

# 八、常见问题

## 1. 图片不显示

检查：

- 路径是否正确
- 文件名是否一致
- 是否重启项目

---

## 2. 新栏目没出现

必须执行：

```bash
npm run sync:blog
```

---

## 3. 页面报错 section/category 不合法

说明你：

- 改了栏目
- 但没运行同步脚本

---

# 九、部署（Vercel）

流程：

1. 推送到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

---

# 十、总结（最重要）

## 你只需要记住：

👉 新增栏目：

```
改 blogStructure.ts → npm run sync:blog
```

👉 新增文章：

```
新建 md 文件
```

👉 删除内容：

```
删配置 / 删文件
```

---

如果以后你想继续升级（比如搜索、标签、评论），可以再扩展这个结构。
