export const sidebarConfig = {
  "tianti": {
    "label": "天梯赛",
    "categories": {
      "L1": "L1"
    }
  }
} as const;

export type SectionKey = keyof typeof sidebarConfig;
