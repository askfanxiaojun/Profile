/**
 * =============================================
 * 网站个人信息配置文件
 * 在这里修改你的所有个人信息
 * =============================================
 */

export const siteConfig = {
  // -------- 基本信息 --------
  name: 'Cali Castle',           // 你的名字
  title: '开发者、设计师、细节控、创始人', // 网站标题副标题
  description: '我叫 Cali，一名开发者，设计师，细节控。',

  // -------- 网站地址（部署后改为你自己的域名）--------
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // -------- 首页标语（四个身份标签）--------
  headline: {
    roles: ['开发者', '设计师', '细节控', '创始人'],
    bio: '我是 Cali，佐玩创始人，目前带领着佐玩致力于创造一个充满创造力的工作环境，同时鼓励团队创造影响世界的产品。我热爱开发，设计，创新，享受生活，以及在未知领域中探索。',
  },

  // -------- 社交链接（不需要的删掉那行即可）--------
  social: {
    twitter: 'https://x.com/thecalicastle',
    github: 'https://github.com/CaliCastle',
    youtube: 'https://youtube.com/@calicastle',
    bilibili: 'https://space.bilibili.com/8350251',
    telegram: 'https://t.me/cali_so',
    email: 'hi@cali.so',
  },

  // -------- 首页照片（放到 /public/photos/ 目录，写文件名）--------
  heroPhotos: [
    '/photos/photo-1.jpg',
    '/photos/photo-2.jpg',
    '/photos/photo-3.jpg',
    '/photos/photo-4.jpg',
    '/photos/photo-5.jpg',
  ],
}

// -------- 工作经历 --------
export const resume: {
  company: string
  title: string
  logo: string   // 放到 /public/logos/ 目录，写文件名
  start: string
  end?: string   // 留空则显示"至今"
}[] = [
  {
    company: '佐玩 Zolplay',
    title: '创始人 & CEO',
    logo: '/logos/zolplay.png',
    start: '2021',
  },
  {
    company: 'ByteDance',
    title: '高级前端工程师',
    logo: '/logos/bytedance.png',
    start: '2019',
    end: '2021',
  },
]

// -------- 项目列表 --------
export const projects: {
  id: string
  name: string
  description: string
  url: string
  icon: string   // 放到 /public/projects/ 目录，写文件名
}[] = [
  {
    id: 'project-1',
    name: '佐玩',
    description: '一家致力于创造有趣产品的创意工作室。',
    url: 'https://zolplay.com',
    icon: '/projects/zolplay.png',
  },
  {
    id: 'project-2',
    name: 'Cali.so',
    description: '我的个人主页与博客，使用 Next.js 构建。',
    url: 'https://cali.so',
    icon: '/projects/cali.png',
  },
]
