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

export type SectionKey = keyof typeof sidebarConfig;
