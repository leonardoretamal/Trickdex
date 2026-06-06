import type { LevelDef } from "@/types";

export const levels: LevelDef[] = [
  {
    level: 1,
    i18nKey: "levels.1.title",
    color: "hsl(var(--level-1))",
    descriptionKey: "levels.1.description",
  },
  {
    level: 2,
    i18nKey: "levels.2.title",
    color: "hsl(var(--level-2))",
    descriptionKey: "levels.2.description",
  },
  {
    level: 3,
    i18nKey: "levels.3.title",
    color: "hsl(var(--level-3))",
    descriptionKey: "levels.3.description",
  },
  {
    level: 4,
    i18nKey: "levels.4.title",
    color: "hsl(var(--level-4))",
    descriptionKey: "levels.4.description",
  },
  {
    level: 5,
    i18nKey: "levels.5.title",
    color: "hsl(var(--level-5))",
    descriptionKey: "levels.5.description",
  },
  {
    level: 6,
    i18nKey: "levels.6.title",
    color: "hsl(var(--level-6))",
    descriptionKey: "levels.6.description",
  },
  {
    level: 7,
    i18nKey: "levels.7.title",
    color: "hsl(var(--level-7))",
    descriptionKey: "levels.7.description",
  },
  {
    level: 8,
    i18nKey: "levels.8.title",
    color: "hsl(var(--level-8))",
    descriptionKey: "levels.8.description",
  },
];

export function getLevel(level: number): LevelDef | undefined {
  return levels.find((l) => l.level === level);
}
