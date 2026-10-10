export type RoastMode = "profile" | "posts";

export interface RoastRewrite {
  label: string;
  text: string;
}

export interface RoastTeaser {
  score: number | null;
  verdict: string;
  highlights: string[];
  lockedCount: number;
}

export interface RoastFull {
  mode: RoastMode;
  score: number | null;
  verdict: string;
  highlights: string[];
  sections: Record<string, string>;
  rewrites: RoastRewrite[];
}

export interface RoastStartResponse {
  success: boolean;
  gated?: boolean;
  roastId?: string;
  mode?: RoastMode;
  teaser?: RoastTeaser;
  message?: string;
}
