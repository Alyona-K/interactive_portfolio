export type ProjectLinkType =
  | "demo"
  | "vercel"
  | "github"
  | "fullstack"
  | "video"
  | "docs"
  | "other";

export interface ProjectLink {
  label: string;
  url: string;
  type?: ProjectLinkType;
}

export interface ImageSet {
  mobile: string;
  mobile2x?: string;
  tablet?: string;
  tablet2x?: string;
  desktop: string;
  desktop2x?: string;
}

export interface ProjectData {
  id: string;
  modalImage: string;
  titleKey: string;
  modalTitleKey: string;
  overviewKey: string;
  whatIBuiltKey: string;
  challengesKey: string;
  stackKey: string;
  links: ProjectLink[];
}

export interface ProjectPreview {
  id: string;
  image: ImageSet;
  titleKey: string;
  altKey?: string;
}

export interface ProjectConfig extends ProjectPreview, ProjectData {}
