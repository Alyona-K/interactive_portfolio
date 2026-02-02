export interface SkillNode {
  id: string;
  titleKey: string;
  contentKey?: string;
  children?: SkillNode[];
}
