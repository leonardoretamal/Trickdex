export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TrickStatus = "locked" | "available" | "learning" | "mastered";

export type TrickFamily =
  | "flip"
  | "twist"
  | "kick"
  | "vault"
  | "ground"
  | "transition";

export type MediaKind = "webm" | "mp4" | "gif" | "poster";

export interface MediaClip {
  kind: MediaKind;
  src: string;
  poster?: string;
  alt: string;
}

export interface Trick {
  id: string;
  slug: string;
  level: Level;
  family: TrickFamily;
  i18nKey: string;
  prerequisites: string[];
  variations: string[];
  entries: string[];
  exits: string[];
  media: MediaClip[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}

export interface LevelDef {
  level: Level;
  i18nKey: string;
  color: string;
  descriptionKey: string;
}
