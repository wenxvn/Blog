import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const structurePath = path.join(root, 'src/config/blogStructure.ts');
const structureUrl = pathToFileURL(structurePath).href;
const { blogStructure } = await import(structureUrl);

const sections = Object.keys(blogStructure);
const categories = [...new Set(
  Object.values(blogStructure).flatMap((section) => Object.keys(section.categories))
)];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(relPath, content) {
  const filePath = path.join(root, relPath);
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`[write] ${relPath}`);
}

function generateSidebarConfig() {
  return `export const sidebarConfig = ${JSON.stringify(blogStructure, null, 2)} as const;\n\nexport type SectionKey = keyof typeof sidebarConfig;\n`;
}

function generateContentConfig() {
  const sectionEnum = sections.map((item) => `'${item}'`).join(', ');
  const categoryEnum = categories.map((item) => `'${item}'`).join(', ');

  return `import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum([${sectionEnum}]),
    category: z.enum([${categoryEnum}]),
    order: z.number().default(1),
    pubDate: z.coerce.date(),
  }),
});

export const collections = {
  blog,
};
`;
}

function createContentDirs() {
  for (const [sectionKey, sectionValue] of Object.entries(blogStructure)) {
    for (const categoryKey of Object.keys(sectionValue.categories)) {
      const dirPath = path.join(root, 'src/content/blog', sectionKey, categoryKey);
      ensureDir(dirPath);
      console.log(`[mkdir] src/content/blog/${sectionKey}/${categoryKey}`);
    }
  }
}

writeFile('src/components/sidebarConfig.ts', generateSidebarConfig());
writeFile('src/content.config.ts', generateContentConfig());
createContentDirs();

console.log('\nDone. Blog structure synced successfully.');
