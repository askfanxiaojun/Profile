# 我的个人主页

基于 [cali.so](https://cali.so) 开源代码改造，去除了数据库、CMS、登录等外部依赖，只需 **Vercel** 一个平台即可部署。

## 技术栈

- [Next.js 14](https://nextjs.org/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- 博客文章：本地 `.mdx` 文件（存在 GitHub 仓库里）

---

## 🚀 部署到 Vercel

1. Fork 这个仓库到你的 GitHub 账号
2. 在 [Vercel](https://vercel.com/) 导入该仓库
3. 添加一个环境变量：`NEXT_PUBLIC_SITE_URL` = `https://你的域名.com`
4. 点击 Deploy，完成！

---

## ✏️ 修改个人信息

打开 `content/site-config.ts`，这个文件是所有个人信息的唯一入口：

```ts
export const siteConfig = {
  name: '你的名字',
  title: '你的头衔',
  description: '自我介绍',
  url: 'https://你的域名.com',

  headline: {
    roles: ['开发者', '设计师', '...'],  // 首页四个标签
    bio: '详细自我介绍文字',
  },

  social: {
    twitter: 'https://x.com/...',
    github: 'https://github.com/...',
    // 不需要的删掉那行
  },

  heroPhotos: [
    '/photos/photo-1.jpg',  // 放到 public/photos/ 目录
    // ...
  ],
}

// 工作经历
export const resume = [
  {
    company: '公司名',
    title: '职位',
    logo: '/logos/company.png',  // 放到 public/logos/ 目录
    start: '2020',
    end: '2022',  // 不填则显示"至今"
  },
]

// 项目列表
export const projects = [
  {
    id: 'project-1',
    name: '项目名',
    description: '项目描述',
    url: 'https://example.com',
    icon: '/projects/icon.png',  // 放到 public/projects/ 目录
  },
]
```

---

## 📝 写博客文章

### 新建文章

在 `content/blog/` 目录下新建一个 `.mdx` 文件，文件名即 URL（只用英文和连字符）：

```
content/blog/my-first-post.mdx
```

访问地址：`https://你的域名/blog/my-first-post`

### 文章格式

每篇文章开头必须有以下信息（frontmatter）：

```yaml
---
title: "文章标题"
description: "文章简介（显示在列表卡片上）"
date: "2024-03-18"
categories: ["技术", "Next.js"]
coverImage: "/blog/my-first-post.jpg"
---

文章正文从这里开始，使用标准 Markdown 语法...
```

### 封面图片

把封面图片放到 `public/blog/` 目录，然后在 frontmatter 的 `coverImage` 填写路径。

建议尺寸：1200 × 675px（16:9 比例）。

### 支持的 Markdown 语法

- **标题**：`## 二级标题`、`### 三级标题`
- **加粗**：`**文字**`
- **斜体**：`*文字*`
- **链接**：`[文字](https://example.com)`
- **图片**：`![描述](/blog/image.jpg)`
- **代码块**：三个反引号 + 语言名（支持语法高亮）
- **引用**：`> 引用内容`
- **列表**：`-` 无序，`1.` 有序
- **表格**：标准 Markdown 表格语法

---

## 🎨 修改网站头像

替换以下文件（保持同名）：
- `public/avatar.png` — 首页大头像
- `public/avatar_alt.png` — 右键点击切换的备用头像
- `app/favicon.ico` — 浏览器标签页图标
- `app/apple-icon.png` — 苹果设备图标
- `app/opengraph-image.png` — 社交分享预览图（1200×630px）

---

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（访问 http://localhost:3000）
npm run dev

# 构建
npm run build
```

---

## 📁 目录结构

```
content/
  blog/           ← 博客文章（.mdx 文件）
  site-config.ts  ← 个人信息配置

public/
  photos/         ← 首页照片
  logos/          ← 工作经历公司 Logo
  projects/       ← 项目图标
  blog/           ← 博客封面图片

app/
  (main)/         ← 主要页面
config/
  nav.ts          ← 导航菜单配置
```
